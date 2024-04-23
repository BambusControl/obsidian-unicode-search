import {Cache} from "../../../libraries/cache";
import {SaveData} from "../../../libraries/types/data/QSaveData";
import {PluginDataLoader} from "../QPluginDataLoader";
import {importData} from "../importData";
import {RootDataStore} from "../qRootDataStore";
import {Settings} from "../../../libraries/types/data/QSettings";
import {Usage} from "../../../libraries/types/data/QUsage";
import {Unicode} from "../../../libraries/types/data/QUnicode";
import {SaveDataVersion} from "../../../libraries/types/data/saveDataVersion";

export class QtRootDataStore implements RootDataStore {

    private storedData: Cache<SaveData>;

    constructor(
        readonly dataLoader: PluginDataLoader,
    ) {
        this.storedData = new Cache(
            () => importData(dataLoader),
            (data) => {
                console.count("Unicode Search saving to storage")
                return dataLoader.saveData(data);
            }
        );
    }

    async isInitialized(): Promise<boolean> {
        const data = await this.storedData.get();
        return data.initialized
            && data.settings.initialized
            && data.unicode.initialized
            && data.usage.initialized
        ;
    }

    async setInitialized(value: boolean): Promise<void> {
        await this.mergeData({
            initialized: value
        })
    }

    async getVersion(): Promise<SaveDataVersion> {
        return (await this.storedData.get()).version;
    }

    async getUnicode(): Promise<Unicode> {
        return (await this.storedData.get()).unicode;
    }

    async overwriteUnicode(data: Unicode): Promise<Unicode> {
        const mergedData = await this.mergeData({
            unicode: data,
        })

        return mergedData.unicode;
    }

    async getSettings(): Promise<Settings> {
        return (await this.storedData.get()).settings;
    }

    async saveSettings(settings: Settings): Promise<Settings> {
        const mergedData = await this.mergeData({
            settings: settings,
        })

        return mergedData.settings;
    }

    async getUsage(): Promise<Usage> {
        return (await this.storedData.get()).usage;
    }

    async saveUsage(usage: Usage): Promise<Usage> {
        const mergedData = await this.mergeData({
            usage: usage,
        })

        return mergedData.usage;
    }

    private async mergeData(data: Partial<SaveData>): Promise<SaveData> {
        const storedData = await this.storedData.get();

        const newData = {
            ...storedData,
            ...data
        };

        this.storedData.set(newData);
        return await this.storedData.persist();
    }
}
