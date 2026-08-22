import type {PoolChunkHandler} from "./poolChunkHandler";
import type {PersistCache} from "../../libraries/types/persistCache";
import type {SaveData, SaveDataOf,} from "../../libraries/types/savedata/saveData";
import type {CharacterChunkHandler} from "./characterChunkHandler";
import type {UseHistoryChunkHandler} from "./useHistoryChunkHandler";
import type {FavoriteChunkHandler} from "./favoriteChunkHandler";
import {isDataChunk} from "../../libraries/helpers/isTypeSaveData";
import type {DataBootstrapper} from "./dataBootstrapper";
import type {MetaChunkHandler} from "./metaChunkHandler";
import type {DataChunk} from "../../libraries/types/savedata/dataChunk";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import type {MetaChunk} from "../../libraries/types/savedata/metaChunk";
import {isInitialSaveData} from "../../libraries/types/savedata/initialSaveData";

type MetaSaveDataChunks = Omit<SaveDataOf<DataChunk>, "meta"> & {
    meta: MetaChunk;
};

export class RootDataBootstrapper implements DataBootstrapper {
    constructor(
        private readonly storedData: PersistCache<any>,
        private readonly metaDm: MetaChunkHandler,
        private readonly poolDm: PoolChunkHandler,
        private readonly unicodeDm: CharacterChunkHandler,
        private readonly useHistoryDm: UseHistoryChunkHandler,
        private readonly favoritesDm: FavoriteChunkHandler,
    ) {
    }

    async initializeData(): Promise<void> {
        console.group("Save data initialization");
        /* We don't know what we will load */
        const loadedData: any = (await this.storedData.get()) ?? {};

        /* First, migrate data from the initial release */
        const migratedData = RootDataBootstrapper.initialMigration(loadedData);

        /* Make sure the data is well-shaped */
        const shapedData = RootDataBootstrapper.shapeLoadedData(migratedData);

        /* Full initialization of meta-data, because other chunks need to process its events */
        const loadedDataWithMeta = await this.initMeta(shapedData);

        /* Now we let each data chunk handle initialization of its data if needed */
        console.group("Initializing data");
        const initializedData = this.initData(loadedDataWithMeta);
        console.groupEnd();

        /* After this, each data chunk manager can request chunks data */
        this.storedData.set(initializedData);

        /* Each data chunk can update its data if needed */
        console.group("Updating data");
        const upToDateData = await this.updateData(initializedData);
        console.groupEnd();

        /* Finally, persist the data */
        console.info("Saving initialized data");
        this.storedData.set(upToDateData);
        await this.storedData.persist();
        console.groupEnd();
    }

    private async initMeta(
        chunks: SaveDataOf<DataChunk>,
    ): Promise<MetaSaveDataChunks> {
        /* Does the skeleton have data? */
        const initializedMeta = this.metaDm.initData(chunks.meta);

        /* Is the data up to date with the latest data version? */
        const upToDateMeta = await this.metaDm.updateData(
            initializedMeta,
            new Set([]),
        );

        /* Check and create the shape of save-data if missing */
        return {
            ...chunks,
            meta: upToDateMeta,
        };
    }

    private initData(chunks: MetaSaveDataChunks): SaveData {
        const poolData = this.poolDm.initData(chunks.pool);
        const unicodeData = this.unicodeDm.initData(chunks.characters);
        const useHistoryData = this.useHistoryDm.initData(chunks.useHistory);
        const favoritesData = this.favoritesDm.initData(chunks.favorites);

        return {
            ...chunks,
            pool: poolData,
            characters: unicodeData,
            useHistory: useHistoryData,
            favorites: favoritesData,
        };
    }

    private async updateData(initializedData: SaveData): Promise<SaveData> {
        /* We load the meta-data first, to be able to process events like re-downloading of characters etc. */
        const metaData = await this.metaDm.updateData(
            initializedData.meta,
            new Set([]),
        );
        const events = new Set(metaData.events);
        console.info("Events to process", events);

        /* All the other updates see the events and handle them accordingly */
        const poolData = await this.poolDm.updateData(initializedData.pool, events);
        const unicodeData = await this.unicodeDm.updateData(
            initializedData.characters,
            events,
        );
        const useHistoryData = await this.useHistoryDm.updateData(
            initializedData.useHistory,
            events,
        );
        const favoritesData = await this.favoritesDm.updateData(
            initializedData.favorites,
            events,
        );

        console.info("Unprocessed events", events);
        metaData.events = Array.from(events);

        return {
            meta: metaData,
            pool: poolData,
            characters: unicodeData,
            useHistory: useHistoryData,
            favorites: favoritesData,
        };
    }

    private static shapeLoadedData(loadedData: any): SaveDataOf<DataChunk> {
        /* Check and create the shape of save-data if missing
         * Removing any element will remove it from save data
         */
        return {
            meta: RootDataBootstrapper.createChunk(loadedData.meta),
            pool: RootDataBootstrapper.createChunk(
                loadedData.pool ?? loadedData.filter,
            ),
            useHistory: RootDataBootstrapper.createChunk(
                loadedData.useHistory ?? loadedData.usage,
            ),
            characters: RootDataBootstrapper.createChunk(loadedData.characters),
            favorites: RootDataBootstrapper.createChunk(loadedData.favorites),
        };
    }

    private static createChunk(dataPart: any): DataChunk {
        return isDataChunk(dataPart)
            ? dataPart
            : {
                initialized: false,
                version: CURRENT_DATA_VERSION,
            };
    }

    /**
     * Migration of data created before the save-data update
     * Only data version of "0.6.0" is migrated to the next version
     */
    private static initialMigration(loadedData: any): any {
        const shouldMigrate = isInitialSaveData(loadedData)
            && loadedData.initialized
            && loadedData.version === "0.6.0";

        if (!shouldMigrate) {
            return loadedData;
        }

        console.info("Migrating from data version 0.6.0");

        return {
            filter: {
                version: loadedData.version,
                ...loadedData.settings,
                unicode: loadedData.settings.filter,
            },
            usage: {
                version: loadedData.version,
                ...loadedData.usage
            },
            characters: {
                version: loadedData.version,
                ...loadedData.unicode
            },
        }
    }
}
