import {FilterDataManager} from "./filterDataManager";
import {PersistCache} from "../../../libraries/types/persistCache";
import {SaveDataNew, SaveDataNewSkeleton} from "../../../libraries/types/savedata/nieuw/saveDataNew";
import {UnicodeDataManager} from "./unicodeDataManager";
import {UsageDataManager} from "./usageDataManager";
import {FavoritesDataManager} from "./favoritesDataManager";
import {isTypeSaveDataNewSkeleton} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";
import {DataManager} from "../dataManager";
import {MetaDataManager} from "./metaDataManager";

export class RootDataManager implements DataManager {
    constructor(
        private readonly storedData: PersistCache<SaveDataNew | SaveDataNewSkeleton>,
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

        /* Do we have something? */
        console.group("Skeleton initialization");
        console.info({loadedData});
        const skeleton = await this.initSkeleton(loadedData);
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

    private async initSkeleton(loadedData: any): Promise<SaveDataNew> {
        const dataLoaded = isTypeSaveDataNewSkeleton(loadedData);
        console.info({dataLoaded});
        const dataSkeleton: SaveDataNewSkeleton = dataLoaded
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

    private async initData(skeleton: SaveDataNew): Promise<SaveDataNew> {
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

    private async updateData(initializedData: SaveDataNew): Promise<SaveDataNew> {
        const metaData = await this.metaDm.updateData(initializedData.meta, new Set([]));
        const events = new Set(metaData.events);

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

}

