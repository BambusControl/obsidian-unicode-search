import {App, Plugin, PluginManifest} from "obsidian";
import {UcdUserFilterDownloader} from "./service/impl/ucdUserFilterDownloader";
import {CodepointStore} from "./service/codePointStore";
import {RootPluginDataStorage} from "./service/impl/rootPluginDataStorage";
import {CodepointStorage} from "./service/impl/codepointStorage";
import {CharacterDownloader} from "./service/characterDownloader";
import {settingsStorage} from "./service/impl/settingsStorage";
import {RootDataStore} from "./service/rootDataStore";
import {initializationData} from "../libraries/data/initializationData";
import {SettingTab} from "./components/settingTab";
import {UsageCharacterService} from "./service/impl/usageCharacterService";
import {CodepointUsageStorage} from "./service/impl/codepointUsageStorage";

import {FuzzySearchModal} from "./components/fuzzySearchModal";

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
        console.group("Loading Unicode Search plugin");
        console.time("Unicode Search load time")

        console.info("Creating services");
        const dataStore = new RootPluginDataStorage(this);
        const codepointStore = new CodepointStorage(dataStore);
        const usageStore = new CodepointUsageStorage(dataStore, codepointStore)
        const characterService = new UsageCharacterService(codepointStore, usageStore);
        const optionsStore = new settingsStorage(dataStore);
        const downloader = new UcdUserFilterDownloader(optionsStore);

        console.group("Initializing local data");
        await UnicodeSearchPlugin.initializeData(dataStore, codepointStore, downloader);
        console.groupEnd();

        console.info("Adding UI elements");
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

        this.addSettingTab(new SettingTab(this.app, this, characterService, optionsStore));
        console.timeEnd("Unicode Search load time")
        console.groupEnd();
    }

    private static async initializeData(
        dataStore: RootDataStore,
        characterDataStore: CodepointStore,
        ucdService: CharacterDownloader
    ): Promise<void> {
        if (await dataStore.isInitialized()) {
            console.info("Plugin data already initialized");
            return;
        }

        if (!(await dataStore.getSettings()).initialized) {
            console.info("Settings initialization");

            await dataStore.saveSettings({
                ...initializationData().settings,
                initialized: true,
            });
        }

        if (!(await dataStore.getUnicode()).initialized) {
            console.info("Downloading UCD");
            const data = await ucdService.download();

            console.info("Saving code point data");
            await characterDataStore.initializeCodepoints(data);
        }

        if (!(await dataStore.getUsage()).initialized) {
            console.info("Usage initialization");

            await dataStore.saveUsage({
                ...initializationData().usage,
                initialized: true,
            });
        }

        console.info("Flagging local data as initialized")
        await dataStore.setInitialized(true);
    }

}
