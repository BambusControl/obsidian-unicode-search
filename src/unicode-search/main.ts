import {App, Plugin, PluginManifest} from "obsidian";
import {QCharacterDownloader} from "./service/characterDownloader";
import {QUCDUserFilterDownloader} from "./service/impl/qucdUserFilterDownloader";
import {QCodePointStore, QtCodePointStore} from "./service/QCodePointStore";
import {QtRootDataStore} from "./service/qRootDataStore";
import {QtOptionsStore} from "./service/qOptionsStore";
import {QMetadataStore} from "./service/QMetadataStore";

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
        const dataStore = new QtRootDataStore(this);
        const characterStore = new QtCodePointStore(dataStore);
        // const characterService = new UsageTrackedCharacterService(characterStore);
        const optionsStore = new QtOptionsStore(dataStore);
        const downloader = new QUCDUserFilterDownloader(optionsStore);

		await UnicodeSearchPlugin.initializeData(dataStore, characterStore, downloader);

		/*super.addCommand({
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

        this.addSettingTab(new SettingTab(this.app, this, characterService, optionsStore));*/
	}

	private static async initializeData(
		metadataStore: QMetadataStore,
		characterDataStore: QCodePointStore,
		ucdService: QCharacterDownloader
	): Promise<void> {
		const initialized = await metadataStore.isInitialized();

		if (initialized) {
			return;
		}

        console.log("[1/3] Downloading UCD data");
		const data = await ucdService.download();

        // console.log({data})

        console.log("[2/3] Initializing character data")
		await characterDataStore.initializeCharacters(data);

        // console.log("[3/3] Initialized!")
	}

}
