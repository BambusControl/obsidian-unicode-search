import {App, Editor, FuzzyMatch, FuzzySuggestModal, Instruction} from "obsidian";
import {equals, UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {ImmutableCharacterStorage} from "../service/storage/immutable-character.storage";
import {OrderedCharacterStorage} from "../service/storage/ordered-character.storage";
import {SavedCharacterStorage} from "../service/storage/saved-character.storage";

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
		private readonly immutableStorage: ImmutableCharacterStorage,
		private readonly orderedStorage: OrderedCharacterStorage,
		private readonly savedStorage: SavedCharacterStorage,
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
		const saved = this.savedStorage.getAll();

		const ordered = this.orderedStorage.getAll()
			.filter(outer => !saved.some(inner => equals(outer, inner)));

		const everything = this.immutableStorage.getAll()
			.filter(outer =>
				!saved.some(inner => equals(outer, inner)
					&& !ordered.some(inner => equals(outer, inner))
				));

		return [
			...saved,
			...ordered,
			...everything
		];
	}

	public onChooseItem(item: UnicodeCharacterInfoModel, evt: MouseEvent | KeyboardEvent): void {
		this.orderedStorage.affect({...item, hitCount: -1})
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
		const data = this.immutableStorage.getAll();

		const index: number = Math.floor(Math.random() * data.length);
		return data[index];
	}

}
