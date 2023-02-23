import {App, Editor, FuzzyMatch, FuzzySuggestModal, Instruction} from "obsidian";
import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {UnicodeCharacterStorage} from "../service/unicode-character.storage";

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
		private readonly service: UnicodeCharacterStorage,
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
		return this.service.getAll();
	}

	public onChooseItem(item: UnicodeCharacterInfoModel, evt: MouseEvent | KeyboardEvent): void {
		this.editor.replaceSelection(item.char);
	}

	public override onNoSuggestion(): void {
		this.setRandomPlaceholder();
	}

	private setRandomPlaceholder(): void {
		const placeholder = `Unicode search: ${this.service.getRandom().name}`;
		super.setPlaceholder(placeholder);
	}

}
