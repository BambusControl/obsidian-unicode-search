import {App, Editor, FuzzyMatch, FuzzySuggestModal} from "obsidian";
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
		return item.name
	}

	public override renderSuggestion(item: FuzzyMatch<UnicodeCharacterInfoModel>, el: HTMLElement): void {
		const container = el.createDiv({
			cls: "plugin obsidian-unicode-search result-item",
		} as DomElementInfo);

		/* preview */
		container.createDiv({
			cls: "character-preview",
		} as DomElementInfo).createSpan({
			text: item.item.char
		} as DomElementInfo)

		/* indexed name */
		const text = container.createDiv({
			cls: "character-name",
		} as DomElementInfo)

		super.renderSuggestion(item, text);
	}

	public getItems(): UnicodeCharacterInfoModel[] {
		return this.service.getAll();
	}

	public onChooseItem(item: UnicodeCharacterInfoModel, evt: MouseEvent | KeyboardEvent): void {
		this.editor.replaceSelection(item.char);
	}

}
