import {App, Plugin, PluginManifest} from "obsidian";
import {UcdUserFilterDownloader} from "./service/impl/ucdUserFilterDownloader";
import {CodepointStore} from "./service/codePointStore";
import {RootPluginDataStorage} from "./service/impl/rootPluginDataStorage";
import {CodepointStorage} from "./service/impl/codepointStorage";
import {CharacterDownloader} from "./service/characterDownloader";
import {SettingsStorage} from "./service/impl/settingsStorage";
import {RootDataStore} from "./service/rootDataStore";
import {initializationData} from "../libraries/data/initializationData";
import {SettingTab} from "./components/settingTab";
import {UsageCharacterService} from "./service/impl/usageCharacterService";
import {CodepointUsageStorage} from "./service/impl/codepointUsageStorage";

import {FuzzySearchModal} from "./components/fuzzySearchModal";
import {NewDataInitializer} from "./service/impl/newDataInitializer";

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
        console.time("Unicode Search load time");

        console.info("Creating services");

        const dataStore = new RootPluginDataStorage(this);
        const codepointStore = new CodepointStorage(dataStore);
        const usageStore = new CodepointUsageStorage(dataStore);
        const characterService = new UsageCharacterService(codepointStore, usageStore);
        const optionsStore = new SettingsStorage(dataStore);
        const downloader = new UcdUserFilterDownloader(optionsStore);
        const initializer = new NewDataInitializer(dataStore, codepointStore, downloader);

        await initializer.initializeData();

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

        this.addSettingTab(new SettingTab(
            this.app,
            this,
            characterService,
            optionsStore,
            initializer,
        ));

        console.timeEnd("Unicode Search load time");
        console.groupEnd();
    }

}
