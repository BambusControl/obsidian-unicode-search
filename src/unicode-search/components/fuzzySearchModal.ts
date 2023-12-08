import {App, Editor, prepareFuzzySearch, prepareSimpleSearch, renderMatches, SuggestModal} from "obsidian";
import {CharacterStore} from "../service/characterStore";

import {CharacterProvider} from "../service/characterProvider";
import * as console from "console";
import {CharacterMatch, NONE_RESULT} from "./characterMetadata";
import {
	ELEMENT_FREQUENT,
	ELEMENT_RECENT,
	INSERT_CHAR_INSTRUCTION,
	INSTRUCTION_DISMISS,
	NAVIGATE_INSTRUCTION
} from "./visualElements";
import {toHexadecimal} from "../../libraries/helpers/toHexadecimal";
import {Character} from "../../libraries/types/character";
import {mostRecentlyUsed} from "../../libraries/helpers/mostRecentlyUsed";
import {averageUseCount} from "../../libraries/helpers/averageUseCount";
import {getRandomItem} from "../../libraries/helpers/getRandomItem";
import {UsageInfo} from "../../libraries/types/usageInfo";

export class FuzzySearchModal extends SuggestModal<CharacterMatch> {
	private readonly mostRecentCutoff: number;
	private readonly averageUsageCount: number;
	private readonly characters: Character[];

	public constructor(
		app: App,
		private readonly editor: Editor,
		characterProvider: CharacterProvider,
		private readonly characterStore: CharacterStore,
	) {
		super(app);

		super.setInstructions([
			NAVIGATE_INSTRUCTION,
			INSERT_CHAR_INSTRUCTION,
			INSTRUCTION_DISMISS,
		]);

		this.characters = characterProvider.getCharacters();


        // TODO: Used characters code duplicate
        const usedCharacters = this.characters
            .filter(char => char.useCount != null && char.lastUsed != null)
            .map(char => char as (Character & UsageInfo));

		this.mostRecentCutoff = mostRecentlyUsed(usedCharacters).last()?.lastUsed ?? 0;
		this.averageUsageCount = averageUseCount(usedCharacters);

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

		const showLastUsed = char.lastUsed != null && char.lastUsed >= this.mostRecentCutoff;
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
		this.characterStore.recordUsage(item.item.char).then(undefined, (err) => console.error(err));
	}

	public override onNoSuggestion(): void {
		this.setRandomPlaceholder();
	}

	private setRandomPlaceholder(): void {
		const placeholder = `Unicode search: ${getRandomItem(this.characters).name}`;
		super.setPlaceholder(placeholder);
	}

}
