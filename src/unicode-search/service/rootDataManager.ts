import {FilterDataManager} from "./filterDataManager";
import {PersistCache} from "../../libraries/types/persistCache";
import {
    SaveData,
    SaveDataOf
} from "../../libraries/types/savedata/saveData";
import {UnicodeDataManager} from "./unicodeDataManager";
import {UsageDataManager} from "./usageDataManager";
import {FavoritesDataManager} from "./favoritesDataManager";
import {isTypeDataFragment} from "../../libraries/helpers/isTypeSaveData";
import {DataManager} from "./dataManager";
import {MetaDataManager} from "./metaDataManager";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {MetaFragment} from "../../libraries/types/savedata/metaFragment";
import {isInitialSaveData} from "../../libraries/types/savedata/initialSaveData";

type MetaSaveDataFragments = Omit<SaveDataOf<DataFragment>, "meta"> & { meta: MetaFragment };

export class RootDataManager implements DataManager {
    constructor(
        private readonly storedData: PersistCache<any>,
        private readonly metaDm: MetaDataManager,
        private readonly filterDm: FilterDataManager,
        private readonly unicodeDm: UnicodeDataManager,
        private readonly usageDm: UsageDataManager,
        private readonly favoritesDm: FavoritesDataManager,
    ) {
    }

    async initializeData(): Promise<void> {
        console.group("Save data initialization");
        /* We don't know what we will load */
        const loadedData: any = (await this.storedData.get()) ?? {};

        /* First, migrate data from initial release */
        const migratedData = RootDataManager.initialMigration(loadedData);

        /* Make sure the data is well-shaped */
        const shapedData = RootDataManager.shapeLoadedData(migratedData);

        /* Full initialization of meta-data, because other fragments need to process its events */
        const loadedDataWithMeta = await this.initMeta(shapedData);

        /* Now we let each data fragment handle initialization of its data if needed */
        console.group("Initializing data");
        const initializedData = this.initData(loadedDataWithMeta);
        console.groupEnd();

        /* After this, each data fragment manager can request fragments data */
        this.storedData.set(initializedData);

        /* Each data fragment can update its data if needed */
        console.group("Updating data");
        const upToDateData = await this.updateData(initializedData);
        console.groupEnd();

        /* Finally, persist the data */
        console.info("Saving initialized data");
        this.storedData.set(upToDateData);
        await this.storedData.persist();
        console.groupEnd();
    }

    private async initMeta(fragments: SaveDataOf<DataFragment>): Promise<MetaSaveDataFragments> {
        /* Does the skeleton have data? */
        const initializedMeta = this.metaDm.initData(fragments.meta);

        /* Is the data up to date with the latest data version? */
        const upToDateMeta = await this.metaDm.updateData(initializedMeta, new Set([]));

        /* Check and create the shape of save-data if missing */
        return {
            ...fragments,
            meta: upToDateMeta,
        };
    }

    private initData(fragments: MetaSaveDataFragments): SaveData {
        const filterData = this.filterDm.initData(fragments.filter);
        const unicodeData = this.unicodeDm.initData(fragments.characters);
        const usageData = this.usageDm.initData(fragments.usage);
        const favoritesData = this.favoritesDm.initData(fragments.favorites);

        return {
            ...fragments,
            filter: filterData,
            characters: unicodeData,
            usage: usageData,
            favorites: favoritesData,
        };
    }

    private async updateData(initializedData: SaveData): Promise<SaveData> {
        /* We load the meta-data first, to be able to process events like re-downloading of characters etc. */
        const metaData = await this.metaDm.updateData(initializedData.meta, new Set([]));
        const events = new Set(metaData.events);
        console.info("Events to process", events);

        /* All the other updates see the events, and handle them accordingly */
        const filterData = await this.filterDm.updateData(initializedData.filter, events);
        const unicodeData = await this.unicodeDm.updateData(initializedData.characters, events);
        const usageData = await this.usageDm.updateData(initializedData.usage, events);
        const favoritesData = await this.favoritesDm.updateData(initializedData.favorites, events);

        console.info("Unprocessed events", events);
        metaData.events = Array.from(events);

        return {
            meta: metaData,
            filter: filterData,
            characters: unicodeData,
            usage: usageData,
            favorites: favoritesData,
        };
    }

    private static shapeLoadedData(loadedData: any): SaveDataOf<DataFragment> {
        /* Check and create the shape of save-data if missing
         * Removing any element will remove it from save data
         */
        return {
            meta: RootDataManager.createFragment(loadedData.meta),
            filter: RootDataManager.createFragment(loadedData.filter),
            usage: RootDataManager.createFragment(loadedData.usage),
            characters: RootDataManager.createFragment(loadedData.characters),
            favorites: RootDataManager.createFragment(loadedData.favorites),
        };
    }

    private static createFragment(dataPart: any): DataFragment {
        return isTypeDataFragment(dataPart)
            ? dataPart
            : {
                initialized: false,
                version: CURRENT_DATA_VERSION,
            };
    }

    /**
     * Migration of data created before the save-data update
     * Only data version of "0.6.0" is migrated
     */
    private static initialMigration(loadedData: any): Pick<SaveData, "filter" | "usage" | "characters"> {
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
