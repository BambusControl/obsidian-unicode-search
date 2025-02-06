import {DataManager} from "./dataManager";
import {PluginDataLoader} from "../../../libraries/types/pluginDataLoader";
import {FilterDataManager} from "./filterDataManager";
import {PersistCache} from "../../../libraries/types/persistCache";
import {SaveDataNew, SaveDataNewSkeleton} from "../../../libraries/types/savedata/nieuw/saveDataNew";
import {UnicodeDataManager} from "./unicodeDataManager";
import {UsageDataManager} from "./usageDataManager";
import {FavoritesDataManager} from "./favoritesDataManager";
import {isTypeSaveDataNewSkeleton} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";
import {init} from "cjs-module-lexer";

export class RootDataManager implements DataManager {
    private readonly storedData: PersistCache<SaveDataNew | SaveDataNewSkeleton>;
    private readonly filterDm: FilterDataManager;
    private readonly unicodeDm: UnicodeDataManager;
    private readonly usageDm: UsageDataManager;
    private readonly favoritesDm: FavoritesDataManager;

    constructor(
        readonly dataLoader: PluginDataLoader,
    ) {
        this.storedData = new PersistCache(
            () => dataLoader.loadData(),
            (data) => dataLoader.saveData(data)
        );
        this.filterDm = new FilterDataManager();
        this.unicodeDm = new UnicodeDataManager();
        this.usageDm = new UsageDataManager();
        this.favoritesDm = new FavoritesDataManager();
    }

    async initialize(): Promise<void> {
        /* We don't know what we will load */
        const loadedData: any = await this.storedData.get();

        /* Do we have something? */
        const skeleton = await this.initSkeleton(loadedData);

        /* Does the skeleton have data? */
        const initializedData = await this.initData(skeleton);

        /* Is the data up to date with the latest data version? */
        const upToDateData = await this.updateData(initializedData);

        this.storedData.set(upToDateData);
        await this.storedData.persist();
    }

    async initSkeleton(loadedData: any): Promise<SaveDataNew> {
        const dataLoaded = isTypeSaveDataNewSkeleton(loadedData);
        const dataSkeleton: SaveDataNewSkeleton = dataLoaded
            ? loadedData
            : {
                filter: null,
                usage: null,
                unicode: null,
                favorites: null,
            };

        const [filterSkeleton, unicodeSkeleton, usageSkeleton, favoritesSkeleton] = await Promise.all([
            this.filterDm.initSkeleton(dataSkeleton.filter),
            this.unicodeDm.initSkeleton(dataSkeleton.unicode),
            this.usageDm.initSkeleton(dataSkeleton.usage),
            this.favoritesDm.initSkeleton(dataSkeleton.favorites)
        ]);

        return {
            filter: filterSkeleton,
            usage: usageSkeleton,
            unicode: unicodeSkeleton,
            favorites: favoritesSkeleton,
        };
    }

    async initData(skeleton: SaveDataNew): Promise<SaveDataNew> {
        const [filterData, unicodeData, usageData, favoritesData] = await Promise.all([
            this.filterDm.initData(skeleton.filter),
            this.unicodeDm.initData(skeleton.unicode),
            this.usageDm.initData(skeleton.usage),
            this.favoritesDm.initData(skeleton.favorites)
        ]);

        return {
            filter: filterData,
            unicode: unicodeData,
            usage: usageData,
            favorites: favoritesData,
        };
    }

    async updateData(initializedData: SaveDataNew): Promise<SaveDataNew> {
        const [filterData, unicodeData, usageData, favoritesData] = await Promise.all([
            this.filterDm.updateData(initializedData.filter),
            this.unicodeDm.updateData(initializedData.unicode),
            this.usageDm.updateData(initializedData.usage),
            this.favoritesDm.updateData(initializedData.favorites)
        ]);

        return {
            filter: filterData,
            unicode: unicodeData,
            usage: usageData,
            favorites: favoritesData,
        };
    }

}

