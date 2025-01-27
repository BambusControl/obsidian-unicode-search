import {DataManager} from "./dataManager";
import {FilterDataNew} from "../../../libraries/types/savedata/nieuw/filterDataNew";
import {DataPartManager} from "./dataPartManager";
import {PluginDataLoader} from "../../../libraries/types/pluginDataLoader";
import {FilterDataManager} from "./filterDataManager";
import {PersistCache} from "../../../libraries/types/persistCache";
import {SaveDataNew, SaveDataNewSkeleton} from "../../../libraries/types/savedata/nieuw/saveDataNew";
import {UnicodeDataNew} from "../../../libraries/types/savedata/nieuw/unicodeDataNew";
import {UsageDataNew} from "../../../libraries/types/savedata/nieuw/usageDataNew";
import {FavoritesDataNew} from "../../../libraries/types/savedata/nieuw/favoritesDataNew";
import {UnicodeDataManager} from "./unicodeDataManager";
import {UsageDataManager} from "./usageDataManager";
import {FavoritesDataManager} from "./favoritesDataManager";
import {isTypeSaveDataNewSkeleton} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";

export class RootDataManager implements DataManager {
    private readonly storedData: PersistCache<SaveDataNew | SaveDataNewSkeleton>;
    private readonly filterDm: DataPartManager<FilterDataNew>
    private readonly unicodeDm: DataPartManager<UnicodeDataNew>
    private readonly usageDm: DataPartManager<UsageDataNew>
    private readonly favoritesDm: DataPartManager<FavoritesDataNew>

    constructor(
        readonly dataLoader: PluginDataLoader,
    ) {
        this.storedData = new PersistCache<SaveDataNew>(
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

        const skeleton = await this.initSkeleton(loadedData);

        await this.initData();
    }

    async initSkeleton(loadedData: any): Promise<void> {
        const dataLoaded = isTypeSaveDataNewSkeleton(loadedData);
        const data: SaveDataNewSkeleton = dataLoaded
            ? loadedData
            : {
                filter: null,
                usage: null,
                unicode: null,
                favorites: null,
            };

        await this.filterDm.initSkeleton(data.filter);
        await this.unicodeDm.initSkeleton(data.unicode);
        await this.usageDm.initSkeleton(data.usage);
        await this.favoritesDm.initSkeleton(data.favorites);
    }

    async initData(): Promise<void> {
        await this.filterDm.initData();
        await this.unicodeDm.initData();
        await this.usageDm.initData();
        await this.favoritesDm.initData();
    }

    async updateData(): Promise<void> {
        await this.filterDm.updateData();
        await this.unicodeDm.updateData();
        await this.usageDm.updateData();
        await this.favoritesDm.updateData();
    }

    async verifyData(): Promise<void> {
        await this.filterDm.verifyData();
        await this.unicodeDm.verifyData();
        await this.usageDm.verifyData();
        await this.favoritesDm.verifyData();
    }

}

