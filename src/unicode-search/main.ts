import {App, Plugin, PluginManifest} from "obsidian";
import {UcdUserFilterDownloader} from "./service/impl/ucdUserFilterDownloader";
import {RootPluginDataStorage} from "./service/impl/rootPluginDataStorage";
import {CodepointStorage} from "./service/impl/codepointStorage";
import {SettingsStorage} from "./service/impl/settingsStorage";
import {SettingTab} from "./components/settingTab";
import {UserCharacterService} from "./service/impl/userCharacterService";
import {CodepointUsageStorage} from "./service/impl/codepointUsageStorage";

import {FuzzySearchModal} from "./components/fuzzySearchModal";
import {NewDataInitializer} from "./service/impl/newDataInitializer";
import { CodepointFavoritesStorage } from "./service/impl/codepointFavoritesStorage";

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
        const favoritesStore = new CodepointFavoritesStorage(dataStore);
        const characterService = new UserCharacterService(codepointStore, usageStore, favoritesStore);
        const optionsStore = new SettingsStorage(dataStore);
        const downloader = new UcdUserFilterDownloader(optionsStore);
        const initializer = new NewDataInitializer(dataStore, downloader);

        /* TODO: Loading user data needs to add char insert commands */

        await initializer.initializeData();

        console.info("Adding UI elements");

        super.addCommand({
            id: "search-unicode-chars",
            name: "Search Unicode characters",

            editorCallback: editor => {
                const modal = new FuzzySearchModal(
                    this.app,
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
            favoritesStore,
            optionsStore,
            initializer,
        ));

        console.timeEnd("Unicode Search load time");
        console.groupEnd();
    }

}
