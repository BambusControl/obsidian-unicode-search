import {App, Editor, prepareFuzzySearch, prepareSimpleSearch, renderMatches, SuggestModal} from "obsidian";
import {CharacterService} from "../service/characterService";

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
import {mostRecentlyUsed} from "../../libraries/helpers/mostRecentlyUsed";
import {averageUseCount} from "../../libraries/helpers/averageUseCount";
import {getRandomItem} from "../../libraries/helpers/getRandomItem";

export class FuzzySearchModal extends SuggestModal<CharacterMatch> {

	public constructor(
		app: App,
		private readonly editor: Editor,
		private readonly characterService: CharacterService,
	) {
		super(app);

		super.setInstructions([
			NAVIGATE_INSTRUCTION,
			INSERT_CHAR_INSTRUCTION,
			INSTRUCTION_DISMISS,
		]);

        // Purposefully ignored result
		this.setRandomPlaceholder().then();
	}

    public override async getSuggestions(query: string): Promise<CharacterMatch[]> {
		const isHexSafe = query.length <= 4 && !query.contains(" ")

		const codepointSearch = isHexSafe ? prepareSimpleSearch(query) : ((text: string) => null);
		const fuzzyNameSearch = prepareFuzzySearch(query);

		return (await this.characterService.getAll())
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

	public override async renderSuggestion(item: CharacterMatch, container: HTMLElement): Promise<void> {
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

        const usedCharacters = (await this.characterService.getUsed());
		const mostRecentCutoff = mostRecentlyUsed(usedCharacters).last()?.lastUsed ?? 0;
		const averageUsageCount = averageUseCount(usedCharacters);

		const showLastUsed = char.lastUsed != null && char.lastUsed >= mostRecentCutoff;
		const showUseCount = char.useCount != null && char.useCount > averageUsageCount;

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
		this.characterService.recordUsage(item.item.char).then(undefined, (err) => console.error(err));
	}

	public override async onNoSuggestion(): Promise<void> {
		await this.setRandomPlaceholder();
	}

	private async setRandomPlaceholder(): Promise<void> {
		const placeholder = `Unicode search: ${getRandomItem((await this.characterService.getAll())).name}`;
		super.setPlaceholder(placeholder);
	}

}
