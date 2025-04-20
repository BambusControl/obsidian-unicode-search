import {FilterDataManager} from "./filterDataManager";
import {PersistCache} from "../../../libraries/types/persistCache";
import {
    SaveData,
    SaveDataMeta,
    SaveDataOf,
    SaveDataSkeleton
} from "../../../libraries/types/savedata/nieuw/saveData";
import {UnicodeDataManager} from "./unicodeDataManager";
import {UsageDataManager} from "./usageDataManager";
import {FavoritesDataManager} from "./favoritesDataManager";
import {isTypeDataFragment, isTypeSaveDataSkeleton} from "../../../libraries/helpers/nieuw/isTypeSaveData";
import {DataManager} from "../dataManager";
import {MetaDataManager} from "./metaDataManager";
import {DataFragment, UninitializedDataFragment} from "../../../libraries/types/savedata/nieuw/dataFragment";
import {CURRENT_VERSION} from "../../../libraries/types/savedata/oud/saveDataVersion";
import {filter} from "rxjs";

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

        /* First, perform full initialization of meta-data */
        console.group("Meta initialization");
        console.info({shapedData});
        const loadedDataWithMeta = await this.initMeta(shapedData);
        console.groupEnd();

        /* Do we have something? */
        console.group("Skeleton initialization");
        console.info({loadedDataWithMeta});
        const skeleton = await this.initSkeleton(loadedDataWithMeta);
        console.groupEnd();

        console.group("Data initialization");
        console.info({skeleton});
        /* Does the skeleton have data? */
        const initializedData = await this.initData(skeleton);
        console.groupEnd();

        console.group("Data update");
        console.info({initializedData});
        /* Is the data up to date with the latest data version? */
        const upToDateData = await this.updateData(initializedData);
        console.groupEnd();

        console.group("Persisting data");
        console.info({upToDateData});
        this.storedData.set(upToDateData);
        await this.storedData.persist();
        console.groupEnd();
    }

    private async initMeta(loadedData: any): Promise<SaveDataMeta> {
        const loadedMetaData = loadedData.meta ?? {};

        /* Do we have something? */
        console.group("Skeleton initialization");
        console.info({metaSkeleton: loadedMetaData});
        const metaSkeleton = await this.metaDm.initSkeleton(loadedMetaData);
        console.groupEnd();

        console.group("Data initialization");
        console.info({skeleton: metaSkeleton});
        /* Does the skeleton have data? */
        const initializedMeta = await this.metaDm.initData(metaSkeleton);
        console.groupEnd();

        console.group("Data update");
        console.info({initializedData: initializedMeta});
        /* Is the data up to date with the latest data version? */
        const upToDateMeta = await this.metaDm.updateData(initializedMeta, new Set([]));
        console.groupEnd();

        /* Check and create the shape of save-data if missing */
        return {
            meta: upToDateMeta,
            filter: loadedData.filter ?? null,
            usage: loadedData.usage ?? null,
            unicode: loadedData.unicode ?? null,
            favorites: loadedData.favorites ?? null,
        };
    }

    private async initSkeleton(loadedData: any): Promise<SaveData> {
        const dataLoaded = isTypeSaveDataSkeleton(loadedData);
        console.info({dataLoaded});
        const dataSkeleton: SaveDataSkeleton = dataLoaded
            ? loadedData
            : {
                meta: null,
                filter: null,
                usage: null,
                unicode: null,
                favorites: null,
            };

        const [metaSkeleton, filterSkeleton, unicodeSkeleton, usageSkeleton, favoritesSkeleton] = await Promise.all([
            this.metaDm.initSkeleton(dataSkeleton.meta),
            this.filterDm.initSkeleton(dataSkeleton.filter),
            this.unicodeDm.initSkeleton(dataSkeleton.unicode),
            this.usageDm.initSkeleton(dataSkeleton.usage),
            this.favoritesDm.initSkeleton(dataSkeleton.favorites)
        ]);

        return {
            meta: metaSkeleton,
            filter: filterSkeleton,
            usage: usageSkeleton,
            unicode: unicodeSkeleton,
            favorites: favoritesSkeleton,
        };
    }

    private async initData(skeleton: SaveData): Promise<SaveData> {
        const [metaData, filterData, unicodeData, usageData, favoritesData] = await Promise.all([
            this.metaDm.initData(skeleton.meta),
            this.filterDm.initData(skeleton.filter),
            this.unicodeDm.initData(skeleton.unicode),
            this.usageDm.initData(skeleton.usage),
            this.favoritesDm.initData(skeleton.favorites)
        ]);

        return {
            meta: metaData,
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

