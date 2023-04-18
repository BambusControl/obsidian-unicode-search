import {App, Plugin, PluginManifest} from "obsidian";
import {ConstantUnicodeStorage} from "./service/constant-unicode.storage";
import {UsageBasedCharacterStorage} from "./service/usage-based-character.storage";
import {UserSavedCharacterStorage} from "./service/user-saved-character.storage";
import {ImmutableCharacterStorage} from "./service/storage/immutable-character.storage";
import {OrderedCharacterStorage} from "./service/storage/ordered-character.storage";
import {SavedCharacterStorage} from "./service/storage/saved-character.storage";
import {FuzzySearchModal} from "./components/fuzzy-search.modal";
import {ExternalData} from "./data/type/external.data";

export default class UnicodeSearchPlugin extends Plugin {

	private services?: {
		immutableCharacterStorage: ConstantUnicodeStorage,
		orderedCharacterStorage: UsageBasedCharacterStorage,
		savedCharacterStorage: UserSavedCharacterStorage,
	};

	private externalData?: ExternalData<any>[];

	public constructor(
		app: App,
		manifest: PluginManifest,
	) {
		super(app, manifest);
	}

	public override async onload(): Promise<void> {
		this.services = {
			immutableCharacterStorage: new ConstantUnicodeStorage(),
			orderedCharacterStorage: new UsageBasedCharacterStorage(),
			savedCharacterStorage: new UserSavedCharacterStorage(),
		};

		this.externalData = [
			this.services.orderedCharacterStorage,
			this.services.savedCharacterStorage,
		]

		await this.importData()

		this.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = new FuzzySearchModal(
					app,
					editor,
					this.services!.immutableCharacterStorage,
					this.services!.orderedCharacterStorage,
					this.services!.savedCharacterStorage,
				);
				modal.open();
				return true;
			},
		});
	}

	public override async onunload(): Promise<void> {
		await this.exportData();
	}

	private async importData(): Promise<any> {
		const data = await super.loadData();

		for (const service of this.externalData!) {
			service.importData(data)
		}
	}

	private async exportData(): Promise<void> {
		// TODO: this doesn't work like this, we need a callback.
		const data = this.externalData!.map(s => s.exportData())
			.reduce((prev, curr) => ({...prev, ...curr}), {})

		return await super.saveData(data);
	}

}
