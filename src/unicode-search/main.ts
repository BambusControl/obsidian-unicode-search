import {App, Plugin, PluginManifest} from "obsidian";
import {UcdUserFilterDownloader} from "./service/impl/ucdUserFilterDownloader";
import {RootPluginDataStorage} from "./service/impl/rootPluginDataStorage";
import {CodepointStorage} from "./service/impl/codepointStorage";
import {SettingsStorage} from "./service/impl/settingsStorage";
import {SettingTab} from "./components/settingTab";
import {UserCharacterService} from "./service/impl/userCharacterService";
import {CodepointUsageStorage} from "./service/impl/codepointUsageStorage";

import {NewDataInitializer} from "./service/impl/newDataInitializer";
import { CodepointFavoritesStorage } from "./service/impl/codepointFavoritesStorage";
import {Commander} from "./service/impl/commander";

/* Used by Obsidian */
// noinspection JSUnusedGlobalSymbols
export default class UnicodeSearchPlugin extends Plugin {
    /* TODO [non-func]: Cleanup the codebase -- make it intuitive
     * There's a bunch of unnecessary classes and extraneous generalizations.
     * Add docs to the necessary parts.
     */

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

        await initializer.initializeData();

        console.info("Adding UI elements");

        const commandAdder = new Commander(this);
        commandAdder.addModal(characterService)
        await commandAdder.addFavorites(favoritesStore);

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
