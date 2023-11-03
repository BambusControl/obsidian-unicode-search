import {
	App,
	Editor,
	Instruction,
	prepareFuzzySearch, prepareQuery, prepareSimpleSearch, renderMatches, SearchResult,
	SuggestModal
} from "obsidian";
import {Character, Characters} from "../../libraries/types/unicode.character";
import {StatTrackedStorage} from "../service/storage/stat-tracked.storage";

import {DataAccess} from "../service/data.access";
import {compareNumbers} from "../../libraries/comparison/compare.numbers";
import {inverse} from "../../libraries/order/inverse";
import {StatTracked} from "../../libraries/types/stat-tracked";
import * as console from "console";
import {placeholder} from "@codemirror/view";
import {compareNullable} from "../../libraries/comparison/compare.nullable";
import {toHexadecimal} from "../../libraries/helpers/hexadecimal.characters";

type Timestamp = number;

const INSERT_CHAR_INSTRUCTION: Instruction = {
	command: "↵",
	purpose: "to insert selected character",
};

const INSTRUCTION_DISMISS: Instruction = {
	command: "esc",
	purpose: "to dismiss",
};

const ELEMENT_RECENT: DomElementInfo = {
	cls: "icon inline-description recent",
	text: "↩",
	title: "used recently",
};

const ELEMENT_FREQUENT: DomElementInfo = {
	cls: "icon inline-description frequent",
	text: "↺",
	title: "used frequently",
};

type CharacterMatch = {
	item: Character,
	// match: Record<keyof Character, SearchResult>;
	match: {
		codepoint: SearchResult,
		name: SearchResult,
	},
}

const NONE_RESULT: SearchResult = {
	score: 0,
	matches: []
}

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

		const sq = isHexSafe ? prepareSimpleSearch(query) : ((text: string) => null);
		const pq = prepareFuzzySearch(query);

		return this.characters
			.map(ch => ({
				item: ch,
				match: {
					codepoint: sq(toHexadecimal(ch)),
					name: pq(ch.name)
				}
			}))
			.filter(r => r.match.name != null || r.match.codepoint != null)
			.map(r => {
				r.match.name ??= NONE_RESULT
				r.match.codepoint ??= NONE_RESULT
				return r as CharacterMatch
			})
			.sort((l, r) =>
				(r.match.codepoint.score - l.match.codepoint.score) + (r.match.name.score - l.match.name.score)
			)

		// return this.characters
		// 	.map(character => ({
		// 		item: character,
		// 		match: {
		// 			/* Characters are expected to always have a single character */
		// 			codepoint: sq(toHexadecimal(character)),
		// 			name: pq(character.name),
		// 		},
		// 	} as CharacterMatch))
		// 	.filter(character => character.match.name != null || character.match.codepoint != null)
		// 	.sort((left, right) => {
		// 		return compareNumbers(
		// 			/* TODO: Weighing Function */
		// 			2 * left.match.codepoint.score + left.match.name.score,
		// 			2 * right.match.codepoint.score + right.match.name.score,
		// 		);
		// 	})
        // ;
	}

	public override renderSuggestion(item: CharacterMatch, el: HTMLElement): void {
		const char = item.item;

		const container = el.createDiv({
			cls: "plugin obsidian-unicode-search result-item",
		});

		/* preview */
		container.createDiv({
			cls: "character-preview",
		}).createSpan({
			text: char.char,
		});

		/* indexed name */
		const text = container.createDiv({
			cls: "character-name",
		});

		const detail = container.createDiv({
			cls: "detail",
		});

		const showPin = char.pinned != null;
		const showLastUsed = char.lastUsed != null && this.topLastUsed.contains(char.lastUsed) && !showPin;
		const showUseCount = char.useCount != null && char.useCount > this.averageUsageCount;

		// Feature: User wants to pin characters most useful to him
		// detail.createDiv({
		// 	cls: "icon interactive pinnable",
		// 	text: "❤",
		// });

		const attributes = detail.createDiv({
			cls: "attributes",
		});

		if (showLastUsed) {
			attributes.createDiv(ELEMENT_RECENT);
		}

		if (showUseCount) {
			attributes.createDiv(ELEMENT_FREQUENT);
		}

		/* the parent renders the elements text with styling for matching letters */
		FuzzySearchModal.renderMatch(item, text);
	}

	private static renderMatch(item: CharacterMatch, el: HTMLElement) {
		renderMatches(el, toHexadecimal(item.item).toUpperCase(), item.match.codepoint.matches);

		el.createSpan({
			text: " | "
		})

		el.createSpan({
			text: item.match.name.score.toString()
		})

		el.createSpan({
			text: " | "
		})

		renderMatches(el, item.item.name, item.match.name.matches)
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
