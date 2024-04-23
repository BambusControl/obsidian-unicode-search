import {App, Plugin, PluginManifest} from "obsidian";
import {QUCDUserFilterDownloader} from "./service/impl/qucdUserFilterDownloader";
import {QCodePointStore} from "./service/QCodePointStore";
import {QtOptionsStore} from "./service/qOptionsStore";
import {QMetadataStore} from "./service/QMetadataStore";
import {QtRootDataStore} from "./service/qtRootDataStore";
import {QtCodePointStore} from "./service/QtCodePointStore";

import {QCodePointData} from "../libraries/types/data/QCodePointData";
import {QCharacterDownloader} from "./service/QCharacterDownloader";

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

        console.log("[2/3] Initializing character data")
		await characterDataStore.initializeCodePoints(data);

        console.log("[3/3] Initialized!")
	}

}
