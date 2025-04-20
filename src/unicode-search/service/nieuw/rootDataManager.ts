import {FilterDataManager} from "./filterDataManager";
import {PersistCache} from "../../../libraries/types/persistCache";
import {
    SaveData,
    SaveDataOf
} from "../../../libraries/types/savedata/nieuw/saveData";
import {UnicodeDataManager} from "./unicodeDataManager";
import {UsageDataManager} from "./usageDataManager";
import {FavoritesDataManager} from "./favoritesDataManager";
import {isTypeDataFragment} from "../../../libraries/helpers/nieuw/isTypeSaveData";
import {DataManager} from "../dataManager";
import {MetaDataManager} from "./metaDataManager";
import {DataFragment} from "../../../libraries/types/savedata/nieuw/dataFragment";
import {CURRENT_VERSION} from "../../../libraries/types/savedata/oud/saveDataVersion";
import {MetaFragment} from "../../../libraries/types/savedata/nieuw/metaFragment";

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
        console.group("Data shape check");
        console.info({loadedData});
        const shapedData = RootDataManager.shapeLoadedData(loadedData);
        console.groupEnd();

        /* Full initialization of meta-data, because other fragments need to process its events */
        console.group("Meta initialization");
        console.info({shapedData});
        const loadedDataWithMeta = await this.initMeta(shapedData);
        console.groupEnd();

        /* Now we let each data fragment handle initialization of its data if needed */
        console.group("Save data initialization");
        console.info({loadedDataWithMeta})
        const initializedData = await this.initData(loadedDataWithMeta);
        console.groupEnd();

        /* Each data fragment can update its data if needed */
        console.group("Data update");
        console.info({initializedData});
        const upToDateData = await this.updateData(initializedData);
        console.groupEnd();

        /* Finally, persist the data */
        console.group("Persisting data");
        console.info({upToDateData});
        this.storedData.set(upToDateData);
        await this.storedData.persist();
        console.groupEnd();
    }

    private async initMeta(fragments: SaveDataOf<DataFragment>): Promise<MetaSaveDataFragments> {
        /* Does the skeleton have data? */
        console.group("Data initialization", {data: fragments.meta});
        const initializedMeta = await this.metaDm.initData(fragments.meta);
        console.groupEnd();

        console.group("Data update", {initializedMeta});
        /* Is the data up to date with the latest data version? */
        const upToDateMeta = await this.metaDm.updateData(initializedMeta, new Set([]));
        console.groupEnd();

        /* Check and create the shape of save-data if missing */
        return {
            ...fragments,
            meta: upToDateMeta,
        };
    }

    private async initData(fragments: MetaSaveDataFragments): Promise<SaveData> {
        const [filterData, unicodeData, usageData, favoritesData] = await Promise.all([
            this.filterDm.initData(fragments.filter),
            this.unicodeDm.initData(fragments.unicode),
            this.usageDm.initData(fragments.usage),
            this.favoritesDm.initData(fragments.favorites)
        ]);

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

        /* All the other updates see the events, and handle them accordingly */
        const [filterData, unicodeData, usageData, favoritesData] = await Promise.all([
            this.filterDm.updateData(initializedData.filter, events),
            this.unicodeDm.updateData(initializedData.unicode, events),
            this.usageDm.updateData(initializedData.usage, events),
            this.favoritesDm.updateData(initializedData.favorites, events)
        ]);

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

