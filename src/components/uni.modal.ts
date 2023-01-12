import {App, Editor, SuggestModal} from "obsidian";
import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {UnicodeCharacterService} from "../service/unicode-character.service";

export class UniModal extends SuggestModal<UnicodeCharacterInfoModel> {

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
		el.textContent = `${value.char} : ${value.description}`;
	}

}

