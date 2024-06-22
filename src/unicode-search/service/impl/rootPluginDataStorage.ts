import {PersistCache} from "../../../libraries/types/persistCache";
import {CURRENT_VERSION, SaveData} from "../../../libraries/types/savedata/saveData";
import {PluginDataLoader} from "../../../libraries/types/pluginDataLoader";
import {importData} from "../../../libraries/helpers/importData";
import {RootDataStore} from "../rootDataStore";
import {SettingsData} from "../../../libraries/types/savedata/settingsData";
import {UsageData} from "../../../libraries/types/savedata/usageData";
import {UnicodeData} from "../../../libraries/types/savedata/unicodeData";

export class RootPluginDataStorage implements RootDataStore {

    private storedData: PersistCache<SaveData>;

    constructor(
        readonly dataLoader: PluginDataLoader,
    ) {
        this.storedData = new PersistCache(
            () => importData(dataLoader),
            (data) => dataLoader.saveData(data)
        );
    }

    async isInitialized(): Promise<boolean> {
        const data = await this.storedData.get();
        return data.initialized
            && data.version === CURRENT_VERSION
            && data.settings.initialized
            && !data.settings.modified
            && data.unicode.initialized
            && data.usage.initialized
        ;
    }

    async setInitialized(value: boolean): Promise<void> {
        await this.mergeData({
            initialized: value,
        });
    }

    async isCurrentVersion(): Promise<boolean> {
        const saveDataVersion = (await this.storedData.get()).version;
        console.info(`Plugin version: ${CURRENT_VERSION}`);
        console.info(`Data version: ${saveDataVersion}`);
        return saveDataVersion === CURRENT_VERSION;
    }

    async getUnicode(): Promise<UnicodeData> {
        return (await this.storedData.get()).unicode;
    }

    async overwriteUnicode(data: UnicodeData): Promise<UnicodeData> {
        const mergedData = await this.mergeData({
            unicode: data,
        });

        return mergedData.unicode;
    }

    async setInitializedUnicode(value: boolean): Promise<void> {
        const data = await this.getUnicode()
        const mergedData: UnicodeData = {
            ...data,
            initialized: value,
        };

        await this.overwriteUnicode(mergedData);
    }

    async getSettings(): Promise<SettingsData> {
        return (await this.storedData.get()).settings;
    }

    async overwriteSettings(settings: SettingsData): Promise<SettingsData> {
        const mergedData = await this.mergeData({
            settings: settings,
        });

        return mergedData.settings;
    }

    async setInitializedSettings(value: boolean): Promise<void> {
        const data = await this.getSettings();
        const mergedData: SettingsData = {
            ...data,
            initialized: value,
        };

        await this.overwriteSettings(mergedData);
    }

    async setFilterSatisfied(value: boolean): Promise<void> {
        const data = await this.getSettings();
        const mergedData: SettingsData = {
            ...data,
            modified: !value,
        };

        await this.overwriteSettings(mergedData);
    }

    async getUsage(): Promise<UsageData> {
        return (await this.storedData.get()).usage;
    }

    async overwriteUsage(usage: UsageData): Promise<UsageData> {
        const mergedData = await this.mergeData({
            usage: usage,
        });

        return mergedData.usage;
    }

    async setInitializedUsage(value: boolean): Promise<void> {
        const data = await this.getUsage();
        const mergedData: UsageData = {
            ...data,
            initialized: value,
        };

        await this.overwriteUsage(mergedData);
    }

    private async mergeData(data: Partial<SaveData>): Promise<SaveData> {
        const storedData = await this.storedData.get();

        const newData: SaveData = {
            ...storedData,
            ...data,
            version: data.initialized ? CURRENT_VERSION : storedData.version,
        };

        this.storedData.set(newData);
        return await this.storedData.persist();
    }
}
