import {type App, Plugin, type PluginManifest} from "obsidian";
import {UcdUserFilterDownloader} from "./service/ucdUserFilterDownloader";
import {SettingTab} from "./components/settingTab";
import {UserCharacterService} from "./service/userCharacterService";

import {Commander} from "./service/commander";
import {RootDataBootstrapper} from "./service/rootDataBootstrapper";
import {PoolChunkHandler} from "./service/poolChunkHandler";
import {CharacterChunkHandler} from "./service/characterChunkHandler";
import {UseHistoryChunkHandler} from "./service/useHistoryChunkHandler";
import {FavoriteChunkHandler} from "./service/favoriteChunkHandler";
import {PersistCache} from "../libraries/types/persistCache";
import {RootPluginDataStorage} from "./service/rootPluginDataStorage";
import {CodePointStorage} from "./service/codePointStorage";
import {UseHistoryStorage} from "./service/useHistoryStorage";
import {FavoriteStorage} from "./service/favoriteStorage";
import {PoolStorage} from "./service/poolStorage";
import {MetaChunkHandler} from "./service/metaChunkHandler";
import {MetaStorage} from "./service/metaStorage";

/* Used by Obsidian */
// noinspection JSUnusedGlobalSymbols
export default class UnicodeSearchPlugin extends Plugin {
    /* TODO [non-func]: Cleanup the codebase -- make it intuitive
     * There's a bunch of unnecessary classes and extraneous generalizations.
     * Add docs to the necessary parts.
     */

    public constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
    }

    public override async onload(): Promise<void> {
        console.group("Loading Unicode Search plugin");
        console.time("Unicode Search load time");

        console.info("Creating services");

        const dataLoader = new PersistCache(
            () => this.loadData(),
            (data) => this.saveData(data),
        );

        /* TODO [rework]: Data stores duplicate access to data */
        const dataStore = new RootPluginDataStorage(dataLoader);
        const metaStore = new MetaStorage(dataStore);
        const codePointStore = new CodePointStorage(dataStore);
        const useHistoryStore = new UseHistoryStorage(dataStore);
        const favoriteStore = new FavoriteStorage(dataStore);
        const characterService = new UserCharacterService(
            codePointStore,
            useHistoryStore,
            favoriteStore,
        );
        const poolStore = new PoolStorage(dataStore, metaStore);

        /* TODO [rework]: Downloader needs filter data, but is before update of char mng. */
        const downloader = new UcdUserFilterDownloader(poolStore);

        const metaChunkHandler = new MetaChunkHandler();
        const poolChunkHandler = new PoolChunkHandler();
        const characterChunkHandler = new CharacterChunkHandler(downloader);
        const useHistoryChunkHandler = new UseHistoryChunkHandler();
        const favoriteChunkHandler = new FavoriteChunkHandler();

        const dataBootstrapper = new RootDataBootstrapper(
            dataLoader,
            metaChunkHandler,
            poolChunkHandler,
            characterChunkHandler,
            useHistoryChunkHandler,
            favoriteChunkHandler,
        );

        await dataBootstrapper.initializeData();

        console.info("Adding UI elements");

        const commandAdder = new Commander(this);
        commandAdder.addModal(characterService);
        await commandAdder.addFavorites(favoriteStore, characterService);

        this.addSettingTab(
            new SettingTab(
                this.app,
                this,
                characterService,
                favoriteStore,
                poolStore,
                dataBootstrapper,
            ),
        );

        console.timeEnd("Unicode Search load time");
        console.groupEnd();
    }
}
