import {App, Editor, FuzzyMatch, FuzzySuggestModal, Instruction} from "obsidian";
import {Character} from "../../libraries/types/unicode.character";
import {StatTrackedStorage} from "../service/storage/stat-tracked.storage";

import {DataAccess} from "../service/data.access";
import {compareNumbers} from "../../libraries/comparison/compare.numbers";
import {inverse} from "../../libraries/order/inverse";

const INSERT_CHAR_INSTRUCTION = {
	command: "↵",
	purpose: "to insert selected character",
} as Instruction;

const INSTRUCTION_DISMISS = {
	command: "esc",
	purpose: "to dismiss",
} as Instruction;

export class FuzzySearchModal extends FuzzySuggestModal<Character> {
	private readonly topLastUsed: number[];
	private readonly averageUsageCount: number;

	public constructor(
		app: App,
		private readonly editor: Editor,
		private readonly dataService: DataAccess,
		private readonly statTrackedStorage: StatTrackedStorage,
	) {
		super(app);

		super.setInstructions([
			INSERT_CHAR_INSTRUCTION,
			INSTRUCTION_DISMISS,
		]);

		const chars = dataService.getCharacters();

		this.topLastUsed = chars.map(char => char.lastUsed)
			.filter(timestamp => timestamp != null)
			.map(timestamp => timestamp as number)
			.sort((a, b) => inverse(compareNumbers(a, b)))
			.slice(0, 3);

		this.averageUsageCount = chars.map(char => char.useCount)
			.filter(count => count != null)
			.map(count => count as number)
			.reduce((sum, current, i, arr) => {
				sum += current;
				return i === arr.length - 1 ? (sum / arr.length) : sum;
			}, 0);

		this.setRandomPlaceholder();
	}

	public override getItemText(item: Character): string {
		return item.name;
	}

	public override renderSuggestion(item: FuzzyMatch<Character>, el: HTMLElement): void {
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

		const detail  = container.createDiv({
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
			attributes.createDiv({
				cls: "icon inline-description recent",
				text: "↩",
				title: "used recently"
			});
		}

		if (showUseCount) {
			attributes.createDiv({
				cls: "icon inline-description frequent",
				text: "↺",
				title: "used frequently",
			});
		}

		/* the parent renders the elements text with styling for matching letters */
		super.renderSuggestion(item, text);
	}

	public override getItems(): Character[] {
		return this.dataService.getCharacters();
	}

	public override onChooseItem(item: Character, evt: MouseEvent | KeyboardEvent): void {
		this.editor.replaceSelection(item.char);

		// I don't want to await this, its more of a side effect
		this.statTrackedStorage.recordUsage(item.char).then(undefined, (err) => console.error(err));
	}

	public override onNoSuggestion(): void {
		this.setRandomPlaceholder();
	}

	private setRandomPlaceholder(): void {
		const placeholder = `Unicode search: ${this.getRandomCharacter().name}`;
		super.setPlaceholder(placeholder);
	}

	private getRandomCharacter(): Character {
		const data = this.dataService.getCharacters();

		const index: number = Math.floor(Math.random() * data.length);
		return data[index];
	}

}
