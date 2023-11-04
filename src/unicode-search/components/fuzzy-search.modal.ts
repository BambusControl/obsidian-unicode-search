import {App, Editor, prepareFuzzySearch, prepareSimpleSearch, renderMatches, SuggestModal} from "obsidian";
import {Character, Characters} from "../../libraries/types/unicode.character";
import {StatTrackedStorage} from "../service/storage/stat-tracked.storage";

import {DataAccess} from "../service/data.access";
import {compareNumbers} from "../../libraries/comparison/compare.numbers";
import {inverse} from "../../libraries/order/inverse";
import {StatTracked} from "../../libraries/types/stat-tracked";
import * as console from "console";
import {CharacterMatch, NONE_RESULT, Timestamp} from "./character.metadata";
import {
	ELEMENT_FREQUENT,
	ELEMENT_RECENT,
	INSERT_CHAR_INSTRUCTION,
	INSTRUCTION_DISMISS,
	NAVIGATE_INSTRUCTION
} from "./visual.elements";
import {toHexadecimal} from "../../libraries/helpers/hexadecimal.characters";

export class FuzzySearchModal extends SuggestModal<CharacterMatch> {
	private readonly topLastUsed: Timestamp[];
	private readonly averageUsageCount: number;
	private readonly characters: Characters;

	public constructor(
		app: App,
		private readonly editor: Editor,
		dataService: DataAccess,
		private readonly statTrackedStorage: StatTrackedStorage,
	) {
		super(app);

		super.setInstructions([
			NAVIGATE_INSTRUCTION,
			INSERT_CHAR_INSTRUCTION,
			INSTRUCTION_DISMISS,
		]);

		this.characters = dataService.getCharacters();
		this.topLastUsed = FuzzySearchModal.getMostRecentUsages(this.characters);
		this.averageUsageCount = FuzzySearchModal.getAverageUseCount(this.characters);

		this.setRandomPlaceholder();
	}

	public override getSuggestions(query: string): CharacterMatch[] | Promise<CharacterMatch[]> {
		const isHexSafe = query.length <= 4 && !query.contains(" ")

		const codepointSearch = isHexSafe ? prepareSimpleSearch(query) : ((text: string) => null);
		const fuzzyNameSearch = prepareFuzzySearch(query);

		return this.characters
			.map(character => ({
				item: character,
				match: {
					codepoint: codepointSearch(toHexadecimal(character)),
					name: fuzzyNameSearch(character.name)
				}
			}))
			.filter(result => result.match.name != null || result.match.codepoint != null)
			.map(result => {
				/* Fill with empty result, so that we don't have to deal with null values */
				result.match.name ??= NONE_RESULT
				result.match.codepoint ??= NONE_RESULT
				return result as CharacterMatch
			})
			.sort((l, r) =>
				/* Matches are scored with negative values up to 0, with 0 meaning full match for fuzzy search */
				(r.match.codepoint.score - l.match.codepoint.score) + (r.match.name.score - l.match.name.score)
			)
	}

	public override renderSuggestion(item: CharacterMatch, container: HTMLElement): void {
		const char = item.item;

		container.addClass("plugin", "unicode-search", "result-item")

		container.createDiv({
			cls: "character-preview",
		}).createSpan({
			text: char.char,
		});

		const separator = container.createDiv({
			cls: "separator"
		})

		const matches = container.createDiv({
			cls: "character-match",
		})

		const text = matches.createDiv({
			cls: "character-name",
		});

		renderMatches(text, item.item.name, item.match.name.matches)

		if (item.match.codepoint.matches.length > 0) {
			const codepoint = matches.createDiv({
				cls: "character-codepoint",
			});

			renderMatches(codepoint, toHexadecimal(item.item), item.match.codepoint.matches);
		}

		const detail = container.createDiv({
			cls: "detail",
		});

		const showPin = char.pinned != null;
		const showLastUsed = char.lastUsed != null && this.topLastUsed.contains(char.lastUsed) && !showPin;
		const showUseCount = char.useCount != null && char.useCount > this.averageUsageCount;

		const attributes = detail.createDiv({
			cls: "attributes",
		});

		if (showLastUsed) {
			attributes.createDiv(ELEMENT_RECENT);
		}

		if (showUseCount) {
			attributes.createDiv(ELEMENT_FREQUENT);
		}
	}

	public override onChooseSuggestion(item: CharacterMatch, evt: MouseEvent | KeyboardEvent): void {
		this.editor.replaceSelection(item.item.char);

		// I don't want to await this, its more of a side effect
		this.statTrackedStorage.recordUsage(item.item.char).then(undefined, (err) => console.error(err));
	}

	public override onNoSuggestion(): void {
		this.setRandomPlaceholder();
	}

	private setRandomPlaceholder(): void {
		const placeholder = `Unicode search: ${this.getRandomCharacter().name}`;
		super.setPlaceholder(placeholder);
	}

	private getRandomCharacter(): Character {
		const chars = this.characters;

		const index: number = Math.floor(Math.random() * chars.length);
		return chars[index];
	}

	private static getMostRecentUsages(characters: Partial<StatTracked>[]): Timestamp[] {
		return characters
			.map(char => char.lastUsed)
			.filter(timestamp => timestamp != null)
			.map(timestamp => timestamp as number)
			.sort((a, b) => inverse(compareNumbers(a, b)))
			.slice(0, 3)
			;
	}

	private static getAverageUseCount(characters: Partial<StatTracked>[]): number {
		const usageStats = characters
			.map(char => char.useCount)
			.filter(count => count != null)
			.map(count => count as number)
		;

		const totalCount = usageStats.length;

		if (totalCount == 0) {
			return 0;
		}

		const sum = usageStats.reduce((sum, current) => sum + current, 0);
		return sum / totalCount;
	}

}
