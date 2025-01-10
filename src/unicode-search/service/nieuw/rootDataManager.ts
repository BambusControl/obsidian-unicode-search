import {DataManager} from "./dataManager";
import {FilterDataNew} from "../../../libraries/types/savedata/nieuw/filterDataNew";
import {DataPartManager} from "./dataPartManager";
import {PluginDataLoader} from "../../../libraries/types/pluginDataLoader";
import {FilterDataManager} from "./filterDataManager";
import {PersistCache} from "../../../libraries/types/persistCache";
import {importDataNew} from "../../../libraries/helpers/nieuw/importDataNew";
import {SaveDataNew} from "../../../libraries/types/savedata/nieuw/saveDataNew";

export class RootDataManager implements DataManager {
    private storedData: PersistCache<SaveDataNew>;
    private readonly filterDm: DataPartManager<FilterDataNew>

    constructor(
        readonly dataLoader: PluginDataLoader,
    ) {
        this.storedData = new PersistCache(
            () => importDataNew(dataLoader),
            (data) => dataLoader.saveData(data)
        );
        this.filterDm = new FilterDataManager();
    }

    async initialize(): Promise<void> {
        await this.initSkeleton();
        await this.initData();
    }

    async initSkeleton(): Promise<void> {
        this.storedData.set({
            filter: await this.filterDm.initSkeleton(),
            unicode: {},
            usage: {},
            favorites: {},
        })
    }

    async initData(): Promise<void> {
        await this.filterDm.initData();
    }

    async updateData(): Promise<void> {
        await this.filterDm.updateData();
    }

    async verifyData(): Promise<void> {
        await this.filterDm.verifyData();
    }

}

