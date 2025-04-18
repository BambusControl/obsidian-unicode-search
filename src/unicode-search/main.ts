import {App, Plugin, PluginManifest} from "obsidian";
import {UcdUserFilterDownloader} from "./service/impl/ucdUserFilterDownloader";
import {RootPluginDataStorage} from "./service/impl/rootPluginDataStorage";
import {CodepointStorage} from "./service/impl/codepointStorage";
import {SettingsStorage} from "./service/impl/settingsStorage";
import {SettingTab} from "./components/settingTab";
import {UserCharacterService} from "./service/impl/userCharacterService";
import {CodepointUsageStorage} from "./service/impl/codepointUsageStorage";

import { CodepointFavoritesStorage } from "./service/impl/codepointFavoritesStorage";
import {Commander} from "./service/impl/commander";
import {RootDataManager} from "./service/nieuw/rootDataManager";
import {FilterDataManager} from "./service/nieuw/filterDataManager";
import {UnicodeDataManager} from "./service/nieuw/unicodeDataManager";
import {UsageDataManager} from "./service/nieuw/usageDataManager";
import {FavoritesDataManager} from "./service/nieuw/favoritesDataManager";
import {PersistCache} from "../libraries/types/persistCache";
import {importData} from "../libraries/helpers/oud/importData";
import {SaveData} from "../libraries/types/savedata/oud/saveData";
import {SaveDataNew, SaveDataNewSkeleton} from "../libraries/types/savedata/nieuw/saveDataNew";

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

        const dataLoader = new PersistCache(
            () => importData(this),
            (data) => this.saveData(data)
        );

        /* TODO [next]: migrate the save data structure for datastore */

        const dataStore = new RootPluginDataStorage(dataLoader as PersistCache<SaveData>);
        const codepointStore = new CodepointStorage(dataStore);
        const usageStore = new CodepointUsageStorage(dataStore);
        const favoritesStore = new CodepointFavoritesStorage(dataStore);
        const characterService = new UserCharacterService(codepointStore, usageStore, favoritesStore);
        const optionsStore = new SettingsStorage(dataStore);

        const downloader = new UcdUserFilterDownloader(optionsStore);

        const filterDm = new FilterDataManager();
        const unicodeDm = new UnicodeDataManager(downloader);
        const usageDm = new UsageDataManager();
        const favoritesDm = new FavoritesDataManager();

        const dataManager = new RootDataManager(
            dataLoader as PersistCache<SaveDataNew | SaveDataNewSkeleton>,
            filterDm,
            unicodeDm,
            usageDm,
            favoritesDm,
        );

        await dataManager.initializeData();

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
            dataManager,
        ));

        console.timeEnd("Unicode Search load time");
        console.groupEnd();
    }

}
