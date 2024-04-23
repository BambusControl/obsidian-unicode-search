import {App, Plugin, PluginManifest} from "obsidian";
import {QUCDUserFilterDownloader} from "./service/impl/qucdUserFilterDownloader";
import {QCodePointStore} from "./service/QCodePointStore";
import {QtRootDataStore} from "./service/qtRootDataStore";
import {QtCodePointStore} from "./service/QtCodePointStore";
import {QCharacterDownloader} from "./service/QCharacterDownloader";
import {QtSettingsStore} from "./service/QtSettingsStore";
import {QRootDataStore} from "./service/qRootDataStore";
import {qInitializationStore} from "./service/qInitializationStore";
import {QSettingTab} from "./components/qSettingsTab";
import {UsageTrackedCharacterService} from "./service/impl/usageTrackedCharacterService";
import {QtCharacterService} from "./service/impl/qtCharacterService";

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
        const codePointStore = new QtCodePointStore(dataStore);
        const characterService = new QtCharacterService(codePointStore);
        const optionsStore = new QtSettingsStore(dataStore);
        const downloader = new QUCDUserFilterDownloader(optionsStore);

        console.group("Initializing local data");
        await UnicodeSearchPlugin.initializeData(dataStore, codePointStore, downloader);
        console.groupEnd();

        console.info("Adding UI elements");
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
        });*/

        this.addSettingTab(new QSettingTab(this.app, this, usage, optionsStore));
        console.timeEnd("Unicode Search load time")
        console.groupEnd();
    }

    private static async initializeData(
        dataStore: QRootDataStore,
        characterDataStore: QCodePointStore,
        ucdService: QCharacterDownloader
    ): Promise<void> {
        if (await dataStore.isInitialized()) {
            console.info("Plugin data already initialized");
            return;
        }

        if (!(await dataStore.getSettings()).initialized) {
            console.info("Settings initialization");

            await dataStore.saveSettings({
                ...qInitializationStore().settings,
                initialized: true,
            });
        }

        if (!(await dataStore.getUnicode()).initialized) {
            console.info("Downloading UCD");
            const data = await ucdService.download();

            console.info("Saving code point data");
            await characterDataStore.initializeCodePoints(data);
        }

        if (!(await dataStore.getUsage()).initialized) {
            console.info("Usage initialization");

            await dataStore.saveUsage({
                ...qInitializationStore().usage,
                initialized: true,
            });
        }

        console.info("Flagging local data as initialized")
        await dataStore.setInitialized(true);
    }

}
