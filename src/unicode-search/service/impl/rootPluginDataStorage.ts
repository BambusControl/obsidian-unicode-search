import {Cache} from "../../../libraries/types/cache";
import {SaveData, SaveDataVersion} from "../../../libraries/types/savedata/saveData";
import {PluginDataLoader} from "../../../libraries/types/pluginDataLoader";
import {importData} from "../../../libraries/helpers/importData";
import {RootDataStore} from "../rootDataStore";
import {SettingsData} from "../../../libraries/types/savedata/settingsData";
import {UsageData} from "../../../libraries/types/savedata/usageData";
import {UnicodeData} from "../../../libraries/types/savedata/unicodeData";

export class RootPluginDataStorage implements RootDataStore {

    private storedData: Cache<SaveData>;

    constructor(
        readonly dataLoader: PluginDataLoader,
    ) {
        this.storedData = new Cache(
            () => importData(dataLoader),
            (data) => dataLoader.saveData(data)
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

    async getUnicode(): Promise<UnicodeData> {
        return (await this.storedData.get()).unicode;
    }

    async overwriteUnicode(data: UnicodeData): Promise<UnicodeData> {
        const mergedData = await this.mergeData({
            unicode: data,
        })

        return mergedData.unicode;
    }

    async setInitializedUnicode(value: boolean): Promise<void> {
        const data = await this.getUnicode()
        const mergedData: UnicodeData = {
            ...data,
            initialized: value,
        }

        await this.overwriteUnicode(mergedData);
    }

    async getSettings(): Promise<SettingsData> {
        return (await this.storedData.get()).settings;
    }

    async overwriteSettings(settings: SettingsData): Promise<SettingsData> {
        const mergedData = await this.mergeData({
            settings: settings,
        })

        return mergedData.settings;
    }

    async setInitializedSettings(value: boolean): Promise<void> {
        const data = await this.getSettings()
        const mergedData: SettingsData = {
            ...data,
            initialized: value,
        }

        await this.overwriteSettings(mergedData);
    }

    async getUsage(): Promise<UsageData> {
        return (await this.storedData.get()).usage;
    }

    async overwriteUsage(usage: UsageData): Promise<UsageData> {
        const mergedData = await this.mergeData({
            usage: usage,
        })

        return mergedData.usage;
    }

    async setInitializedUsage(value: boolean): Promise<void> {
        const data = await this.getUsage()
        const mergedData: UsageData = {
            ...data,
            initialized: value,
        }

        await this.overwriteUsage(mergedData);
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
