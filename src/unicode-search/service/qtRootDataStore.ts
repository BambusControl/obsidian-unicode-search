import {QMetadataStore} from "./QMetadataStore";
import {Cache} from "./cache";
import {QSaveData} from "../../libraries/types/data/QSaveData";
import {QPluginDataLoader} from "./QPluginDataLoader";
import {qImportData} from "./qImportData";
import {UnicodeSearchError} from "../errors/unicodeSearchError";
import {QRootDataStore} from "./qRootDataStore";
import {QSettings} from "../../libraries/types/data/QSettings";
import {QUser} from "../../libraries/types/data/QUser";
import {QUnicode} from "../../libraries/types/data/QUnicode";

export class QtRootDataStore implements QRootDataStore, QMetadataStore {

    private storedData: Cache<QSaveData>;

    constructor(
        readonly dataLoader: QPluginDataLoader,
    ) {
        this.storedData = new Cache(
            () => qImportData(dataLoader),
            (data) => dataLoader.saveData(data)
        );
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

    async getUsage(): Promise<QUser> {
        return (await this.storedData.get()).usage;
    }

    async saveUsage(usage: QUser): Promise<QUser> {
        const mergedData = await this.mergeData({
            usage: usage,
        })

        return mergedData.usage;
    }

    isInitialized(): Promise<boolean> {
        /* TODO [metadatastore] */
        return Promise.resolve(false);
    }

    async saveToStorage(): Promise<void> {
        /* TODO: Is explicit saving needed? */
        await this.storedData.persist();
    }

    private async mergeData(data: Partial<QSaveData>): Promise<QSaveData> {
        const storedData = await this.storedData.get();


        const newData = {
            ...storedData,
            ...data
        };

        console.debug({
            storedData: storedData,
            data: data,
            newData: newData,
        })

        this.storedData.set(newData);
        return await this.storedData.persist();
    }
}
