import {App, Plugin, PluginManifest} from "obsidian";
import {FuzzySearchModal} from "./components/fuzzy-search.modal";
import {UnicodeCharacterStorage} from "./service/unicode-character.storage";
import {ConstantUnicodeCharacterStorage} from "./service/constant-unicode-character.storage";

export default class UnicodeSearchPlugin extends Plugin {

	private readonly service: UnicodeCharacterStorage;

	public constructor(
		app: App,
		manifest: PluginManifest,
	) {
		super(app, manifest);
		this.service = new ConstantUnicodeCharacterStorage();
	}

	public override async onload(): Promise<void> {
		this.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = new FuzzySearchModal(this.app, editor, this.service);
				modal.open();
				return true;
			},
		});
	}

	public override onunload(): void {
		// Intentionally left blank
	}
}

