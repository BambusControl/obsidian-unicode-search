import {Cache} from "../../../libraries/cache";
import {QSaveData} from "../../../libraries/types/data/QSaveData";
import {QPluginDataLoader} from "../QPluginDataLoader";
import {qImportData} from "../qImportData";
import {QRootDataStore} from "../qRootDataStore";
import {QSettings} from "../../../libraries/types/data/QSettings";
import {QUsage} from "../../../libraries/types/data/QUsage";
import {QUnicode} from "../../../libraries/types/data/QUnicode";
import {SaveDataVersion} from "../../../libraries/types/data/saveDataVersion";

export class QtRootDataStore implements QRootDataStore {

    private storedData: Cache<QSaveData>;

    constructor(
        readonly dataLoader: QPluginDataLoader,
    ) {
        this.storedData = new Cache(
            () => qImportData(dataLoader),
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

    async getUnicode(): Promise<QUnicode> {
        return (await this.storedData.get()).unicode;
    }

    async overwriteUnicode(data: QUnicode): Promise<QUnicode> {
        const mergedData = await this.mergeData({
            unicode: data,
        })

        return mergedData.unicode;
    }

    async getSettings(): Promise<QSettings> {
        return (await this.storedData.get()).settings;
    }

    async saveSettings(settings: QSettings): Promise<QSettings> {
        const mergedData = await this.mergeData({
            settings: settings,
        })

        return mergedData.settings;
    }

    async getUsage(): Promise<QUsage> {
        return (await this.storedData.get()).usage;
    }

    async saveUsage(usage: QUsage): Promise<QUsage> {
        const mergedData = await this.mergeData({
            usage: usage,
        })

        return mergedData.usage;
    }

    private async mergeData(data: Partial<QSaveData>): Promise<QSaveData> {
        const storedData = await this.storedData.get();

        const newData = {
            ...storedData,
            ...data
        };

        this.storedData.set(newData);
        return await this.storedData.persist();
    }
}
