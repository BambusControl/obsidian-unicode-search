import {App, Plugin, PluginManifest} from "obsidian";
import {UCDUserFilterDownloader} from "./service/impl/qucdUserFilterDownloader";
import {CodepointStore} from "./service/QCodepointStore";
import {QtRootDataStore} from "./service/impl/qtRootDataStore";
import {QtCodepointStore} from "./service/impl/QtCodepointStore";
import {CharacterDownloader} from "./service/QCharacterDownloader";
import {QtSettingsStore} from "./service/impl/QtSettingsStore";
import {RootDataStore} from "./service/qRootDataStore";
import {initializationData} from "./service/initializationData";
import {SettingTab} from "./components/qSettingsTab";
import {QtCharacterService} from "./service/impl/qtCharacterService";
import {QtUsageStore} from "./service/impl/QtUsageStore";
import {FuzzySearchModal} from "./components/qFuzzySearchModal";

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
        const dataStore = new QtRootDataStore(this);
        const codepointStore = new QtCodepointStore(dataStore);
        const usageStore = new QtUsageStore(dataStore, codepointStore)
        const characterService = new QtCharacterService(codepointStore, usageStore);
        const optionsStore = new QtSettingsStore(dataStore);
        const downloader = new UCDUserFilterDownloader(optionsStore);

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
