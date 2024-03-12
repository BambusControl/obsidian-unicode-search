import {App, Plugin, PluginManifest} from "obsidian";
import {UsageTrackedCharacterService} from "./service/impl/usageTrackedCharacterService";
import {FuzzySearchModal} from "./components/fuzzySearchModal";
import {PluginSaveDataStore} from "./service/impl/pluginSaveDataStore";
import {CharacterStore} from "./service/characterStore";
import {UCDDownloader} from "./service/impl/ucdDownloader";
import {SettingTab} from "./components/settingsTab"
import {CharacterDownloader} from "./service/characterDownloader";
import {MetadataStore} from "./service/metadataStore";
import {UCDUserFilterDownloader} from "./service/impl/ucdUserFilterDownloader";

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
		const characterService = new UsageTrackedCharacterService(dataStore);
        const downloader = new UCDUserFilterDownloader(dataStore);

		await UnicodeSearchPlugin.initializeData(dataStore, dataStore, downloader);

		super.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = new FuzzySearchModal(
					app,
					editor,
					characterService,
				);
				modal.open();
				return true;
			},
		});

        this.addSettingTab(new SettingTab(this.app, this, characterService, dataStore));
	}

	private static async initializeData(
		saveDataStore: MetadataStore,
		characterDataStore: CharacterStore,
		ucdService: CharacterDownloader
	): Promise<void> {
		const initialized = await saveDataStore.isInitialized();

		if (initialized) {
			return;
		}

        console.log("[1/3] Downloading UCD data");
		const data = await ucdService.download();

        console.log("[2/3] Initializing character data")
		await characterDataStore.initializeCharacters(data);

        console.log("[3/3] Initialized!")
	}

}
