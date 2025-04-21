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
import {CURRENT_VERSION} from "../../libraries/types/savedata/saveDataVersion";
import {MetaFragment} from "../../libraries/types/savedata/metaFragment";

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
        /* We don't know what we will load */
        const loadedData: any = await this.storedData.get();

        /* First, make sure the data is well-shaped */
        console.info("Data shape check");
        const shapedData = RootDataManager.shapeLoadedData(loadedData);

        /* Full initialization of meta-data, because other fragments need to process its events */
        console.group("Meta initialization");
        const loadedDataWithMeta = await this.initMeta(shapedData);
        console.groupEnd();

        /* Now we let each data fragment handle initialization of its data if needed */
        console.info("Save data initialization");
        const initializedData = await this.initData(loadedDataWithMeta);

        /* Each data fragment can update its data if needed */
        console.group("Data update");
        const upToDateData = await this.updateData(initializedData);
        console.groupEnd();

        /* Finally, persist the data */
        console.info("Persisting data");
        this.storedData.set(upToDateData);
        await this.storedData.persist();
    }

    private async initMeta(fragments: SaveDataOf<DataFragment>): Promise<MetaSaveDataFragments> {
        /* Does the skeleton have data? */
        console.info("Data initialization", {data: fragments.meta});
        const initializedMeta = this.metaDm.initData(fragments.meta);

        console.info("Data update", {data: initializedMeta});
        /* Is the data up to date with the latest data version? */
        const upToDateMeta = await this.metaDm.updateData(initializedMeta, new Set([]));

        /* Check and create the shape of save-data if missing */
        console.info("Data shape check", {data: upToDateMeta});
        return {
            ...fragments,
            meta: upToDateMeta,
        };
    }

    private async initData(fragments: MetaSaveDataFragments): Promise<SaveData> {
        const filterData = this.filterDm.initData(fragments.filter);
        const unicodeData = this.unicodeDm.initData(fragments.unicode);
        const usageData = this.usageDm.initData(fragments.usage);
        const favoritesData = this.favoritesDm.initData(fragments.favorites);

        return {
            ...fragments,
            filter: filterData,
            unicode: unicodeData,
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
        const unicodeData = await this.unicodeDm.updateData(initializedData.unicode, events);
        const usageData = await this.usageDm.updateData(initializedData.usage, events);
        const favoritesData = await this.favoritesDm.updateData(initializedData.favorites, events);

        console.info("Unprocessed events", events);
        metaData.events = Array.from(events);

        return {
            meta: metaData,
            filter: filterData,
            unicode: unicodeData,
            usage: usageData,
            favorites: favoritesData,
        };
    }

    private static shapeLoadedData(loadedData: any): SaveDataOf<DataFragment> {
        /* Check and create the shape of save-data if missing */
        return {
            meta: RootDataManager.createFragment(loadedData.meta),
            filter: RootDataManager.createFragment(loadedData.filter),
            usage: RootDataManager.createFragment(loadedData.usage),
            unicode: RootDataManager.createFragment(loadedData.unicode),
            favorites: RootDataManager.createFragment(loadedData.favorites),
        };
    }

    private static createFragment(dataPart: any): DataFragment {
        return isTypeDataFragment(dataPart)
            ? dataPart
            : {
                initialized: false,
                version: CURRENT_VERSION,
            };
    }
}

