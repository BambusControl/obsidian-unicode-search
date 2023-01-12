import {App, Editor, FuzzySuggestModal, SuggestModal} from "obsidian";
import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {UnicodeCharacterService} from "../service/unicode-character.service";
import {UnicodeCharacterStorage} from "../service/unicode-character.storage";

export class SearchModal extends SuggestModal<UnicodeCharacterInfoModel> {

	public constructor(
		app: App,
		private readonly editor: Editor,
		private readonly service: UnicodeCharacterService,
	) {
		super(app);
	}

	public override getSuggestions(query: string): UnicodeCharacterInfoModel[] | Promise<UnicodeCharacterInfoModel[]> {
		if (query == null || query.length == 0) {
			return [];
		}

		return this.service.search(query);
	}

	public onChooseSuggestion(item: UnicodeCharacterInfoModel, evt: MouseEvent | KeyboardEvent): any {
		this.editor.replaceSelection(item.char);
	}

	public renderSuggestion(value: UnicodeCharacterInfoModel, el: HTMLElement): any {
		el.textContent = `${value.char} : ${value.name}`;
	}

}

export class FuzzySearchModal extends FuzzySuggestModal<UnicodeCharacterInfoModel> {

	public constructor(
		app: App,
		private readonly editor: Editor,
		private readonly service: UnicodeCharacterStorage
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
