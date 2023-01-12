import {App, Editor, FuzzySuggestModal} from "obsidian";
import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {UnicodeCharacterStorage} from "../service/unicode-character.storage";

export class FuzzySearchModal extends FuzzySuggestModal<UnicodeCharacterInfoModel> {

	public constructor(
		app: App,
		private readonly editor: Editor,
		private readonly service: UnicodeCharacterStorage,
	) {
		super(app);
	}

	public getItemText(item: UnicodeCharacterInfoModel): string {
		return `${item.char} : ${item.name}`;
	}

	public getItems(): UnicodeCharacterInfoModel[] {
		return this.service.getAll();
	}

	public onChooseItem(item: UnicodeCharacterInfoModel, evt: MouseEvent | KeyboardEvent): void {
		this.editor.replaceSelection(item.char);
	}

}
