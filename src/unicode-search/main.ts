import {App, Plugin, PluginManifest} from "obsidian";
import {UcdUserFilterDownloader} from "./service/impl/ucdUserFilterDownloader";
import {SettingTab} from "./components/settingTab";
import {UserCharacterService} from "./service/impl/userCharacterService";

import {Commander} from "./service/impl/commander";
import {RootDataManager} from "./service/nieuw/rootDataManager";
import {FilterDataManager} from "./service/nieuw/filterDataManager";
import {UnicodeDataManager} from "./service/nieuw/unicodeDataManager";
import {UsageDataManager} from "./service/nieuw/usageDataManager";
import {FavoritesDataManager} from "./service/nieuw/favoritesDataManager";
import {PersistCache} from "../libraries/types/persistCache";
import {SaveDataNew, SaveDataNewSkeleton} from "../libraries/types/savedata/nieuw/saveDataNew";
import {RootPluginDataStorageNew} from "./service/nieuw/rootPluginDataStorageNew";
import {CodepointStorageNew} from "./service/nieuw/codepointStorageNew";
import {CodepointUsageStorageNew} from "./service/nieuw/codepointUsageStorageNew";
import {CodepointFavoritesStorageNew} from "./service/nieuw/codepointFavoritesStorageNew";
import {FilterStorageNew} from "./service/nieuw/filterStorageNew";
import {MetaDataManager} from "./service/nieuw/metaDataManager";

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
            () => this.loadData(),
            (data) => this.saveData(data)
        );

        const dataStore = new RootPluginDataStorageNew(dataLoader);
        const codepointStore = new CodepointStorageNew(dataStore);
        const usageStore = new CodepointUsageStorageNew(dataStore);
        const favoritesStore = new CodepointFavoritesStorageNew(dataStore);
        const characterService = new UserCharacterService(codepointStore, usageStore, favoritesStore);
        const optionsStore = new FilterStorageNew(dataStore);

        const downloader = new UcdUserFilterDownloader(optionsStore);

        const metaDm = new MetaDataManager();
        const filterDm = new FilterDataManager();
        const unicodeDm = new UnicodeDataManager(downloader);
        const usageDm = new UsageDataManager();
        const favoritesDm = new FavoritesDataManager();

        const dataManager = new RootDataManager(
            dataLoader as PersistCache<SaveDataNew | SaveDataNewSkeleton>,
            metaDm,
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
