import {App, Plugin, PluginManifest} from "obsidian";
import {UcdUserFilterDownloader} from "./service/ucdUserFilterDownloader";
import {SettingTab} from "./components/settingTab";
import {UserCharacterService} from "./service/userCharacterService";

import {Commander} from "./service/commander";
import {RootDataManager} from "./service/rootDataManager";
import {FilterDataManager} from "./service/filterDataManager";
import {UnicodeDataManager} from "./service/unicodeDataManager";
import {UsageDataManager} from "./service/usageDataManager";
import {FavoritesDataManager} from "./service/favoritesDataManager";
import {PersistCache} from "../libraries/types/persistCache";
import {RootPluginDataStorage} from "./service/rootPluginDataStorage";
import {CodepointStorage} from "./service/codepointStorage";
import {CodepointUsageStorage} from "./service/codepointUsageStorage";
import {CodepointFavoritesStorage} from "./service/codepointFavoritesStorage";
import {FilterStorage} from "./service/filterStorage";
import {MetaDataManager} from "./service/metaDataManager";
import {MetaStorage} from "./service/metaStorage";

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

        /* TODO [rework]: Data stores duplicate access to data */
        const dataStore = new RootPluginDataStorage(dataLoader);
        const metaStore = new MetaStorage(dataStore);
        const codepointStore = new CodepointStorage(dataStore);
        const usageStore = new CodepointUsageStorage(dataStore);
        const favoritesStore = new CodepointFavoritesStorage(dataStore);
        const characterService = new UserCharacterService(codepointStore, usageStore, favoritesStore);
        const filterStore = new FilterStorage(dataStore, metaStore);

        /* TODO [rework]: Downloader needs filter data, but is before update of char mng. */
        const downloader = new UcdUserFilterDownloader(filterStore);

        const metaDm = new MetaDataManager();
        const filterDm = new FilterDataManager();
        const unicodeDm = new UnicodeDataManager(downloader);
        const usageDm = new UsageDataManager();
        const favoritesDm = new FavoritesDataManager();

        const dataManager = new RootDataManager(
            dataLoader,
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
            filterStore,
            dataManager,
        ));

        console.timeEnd("Unicode Search load time");
        console.groupEnd();
    }

}
