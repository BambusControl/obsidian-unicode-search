import {App, Editor, SuggestModal} from "obsidian";
import {UnicodeCharacterInfoModel} from "./unicode-character-info.model";
import {UnicodeCharacterService} from "./unicode-character.service";

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
		const unicodeCharacter = `&#x${item.code}`;
		const isRange = this.editor.somethingSelected();

		if (isRange) {
			this.editor.replaceSelection(unicodeCharacter);
		} else {
			this.editor.replaceRange(unicodeCharacter, this.editor.getCursor());
		}
	}

	public renderSuggestion(value: UnicodeCharacterInfoModel, el: HTMLElement): any {
		el.textContent = `&#x${value.code} : ${value.description}`;
	}

}

