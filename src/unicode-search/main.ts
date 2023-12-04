import {App, Plugin, PluginManifest} from "obsidian";
import {UsageTrackedStore} from "./service/impl/usageTrackedStore";
import {FuzzySearchModal} from "./components/fuzzySearchModal";
import {PluginSaveDataStore} from "./service/impl/pluginSaveDataStore";
import {SaveDataStore} from "./service/saveDataStore";
import {UnicodeCharacterDatabase} from "./service/impl/unicodeCharacterDatabase";
import {SettingTab} from "./components/settingsTab"
import {CharacterDownloader} from "./service/characterDownloader";

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
        const dataService = new PluginSaveDataStore(this);
		const usageTrackedStorage = new UsageTrackedStore(dataService);

		await UnicodeSearchPlugin.initializeData(dataService, new UnicodeCharacterDatabase());

		super.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = new FuzzySearchModal(
					app,
					editor,
					dataService,
					usageTrackedStorage,
				);
				modal.open();
				return true;
			},
		});

        this.addSettingTab(new SettingTab(this.app, this));
	}

	private static async initializeData(dataService: SaveDataStore, ucdService: CharacterDownloader): Promise<void> {
		const initialized = await dataService.isInitialized();

		if (initialized) {
			return;
		}

		const data = await ucdService.fetchCharacters();

		await dataService.exportData(data);
		await dataService.setAsInitialized();
	}

}
