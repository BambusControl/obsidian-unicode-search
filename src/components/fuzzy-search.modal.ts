import {App, Editor, FuzzyMatch, FuzzySuggestModal, Instruction} from "obsidian";
import {UnicodeCharacterInfoModel} from "../data/unicode-character-info.model";
import {StatTrackedStorage} from "../service/storage/stat-tracked.storage";

import {DataAccess} from "../service/data.access";

const INSERT_CHAR_INSTRUCTION = {
	command: "↵",
	purpose: "to insert selected character",
} as Instruction;

const INSTRUCTION_DISMISS = {
	command: "esc",
	purpose: "to dismiss",
} as Instruction;

export class FuzzySearchModal extends FuzzySuggestModal<UnicodeCharacterInfoModel> {

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

		this.setRandomPlaceholder();
	}

	public getItemText(item: UnicodeCharacterInfoModel): string {
		return item.name;
	}

	public override renderSuggestion(item: FuzzyMatch<UnicodeCharacterInfoModel>, el: HTMLElement): void {
		const container = el.createDiv({
			cls: "plugin obsidian-unicode-search result-item",
		});

		/* preview */
		container.createDiv({
			cls: "character-preview",
		}).createSpan({
			text: item.item.char,
		});

		/* indexed name */
		const text = container.createDiv({
			cls: "character-name",
		});

		super.renderSuggestion(item, text);
	}

	public getItems(): UnicodeCharacterInfoModel[] {
		return this.dataService.getCharacters();
	}

	public onChooseItem(item: UnicodeCharacterInfoModel, evt: MouseEvent | KeyboardEvent): void {
		this.statTrackedStorage.recordUsage(item.char);
		this.editor.replaceSelection(item.char);
	}

	public override onNoSuggestion(): void {
		this.setRandomPlaceholder();
	}

	private setRandomPlaceholder(): void {
		const placeholder = `Unicode search: ${this.getRandomCharacter().name}`;
		super.setPlaceholder(placeholder);
	}

	private getRandomCharacter(): UnicodeCharacterInfoModel {
		const data = this.dataService.getCharacters();

		const index: number = Math.floor(Math.random() * data.length);
		return data[index];
	}

}
