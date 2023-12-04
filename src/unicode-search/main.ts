import {App, Plugin, PluginManifest} from "obsidian";
import {UsageTrackedStore} from "./service/storage/usageTrackedStore";
import {FuzzySearchModal} from "./components/fuzzySearchModal";
import {PluginSaveDataService} from "./service/pluginSaveDataService";
import {StorageService} from "./service/storageService";
import {UnicodeCharacterDatabaseService} from "./service/unicodeCharacterDatabaseService";
import {SettingTab} from "./components/settingsTab"
import {CharacterDownloadService} from "./service/characterDownloadService";

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
        const dataService = new PluginSaveDataService(this);
		const usageTrackedStorage = new UsageTrackedStore(dataService);

		await UnicodeSearchPlugin.initializeData(dataService, new UnicodeCharacterDatabaseService());

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

	private static async initializeData(dataService: StorageService, ucdService: CharacterDownloadService): Promise<void> {
		const initialized = await dataService.isInitialized();

		if (initialized) {
			return;
		}

		const data = await ucdService.fetchCharacters();

		await dataService.exportData(data);
		await dataService.setAsInitialized();
	}

}
