import {App, Plugin, PluginManifest} from "obsidian";
import {UsageTrackedCharacterStore} from "./service/impl/usageTrackedCharacterStore";
import {FuzzySearchModal} from "./components/fuzzySearchModal";
import {PluginSaveDataStore} from "./service/impl/pluginSaveDataStore";
import {CharacterDataStore} from "./service/characterDataStore";
import {UnicodeCharacterDatabase} from "./service/impl/unicodeCharacterDatabase";
import {SettingTab} from "./components/settingsTab"
import {CharacterDownloader} from "./service/characterDownloader";
import {SaveDataStore} from "./service/saveDataStore";

/* Used by Obsidian */
// noinspection JSUnusedGlobalSymbols
export default class UnicodeSearchPlugin extends Plugin {

	public constructor(
		app: App,
		manifest: PluginManifest,
	) {
		super(app, manifest);
	}

	public override async onload(): Promise<void> {
        const dataStore = new PluginSaveDataStore(this);
		const characterStore = new UsageTrackedCharacterStore(dataStore);

		await UnicodeSearchPlugin.initializeData(dataStore, dataStore, new UnicodeCharacterDatabase());

		super.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = new FuzzySearchModal(
					app,
					editor,
					characterStore,
				);
				modal.open();
				return true;
			},
		});

        this.addSettingTab(new SettingTab(this.app, this, characterStore, dataStore));
	}

	private static async initializeData(
		saveDataStore: SaveDataStore,
		characterDataStore: CharacterDataStore,
		ucdService: CharacterDownloader
	): Promise<void> {
		const initialized = await saveDataStore.isSaveDataInitialized();

		if (initialized) {
			return;
		}

		const data = await ucdService.fetchCharacters();

		await characterDataStore.exportCharacters(data);
		await saveDataStore.setSaveDataAsInitialized();
	}

}
