import {PersistCache} from "../../../libraries/types/persistCache";
import {CURRENT_VERSION, SaveData} from "../../../libraries/types/savedata/oud/saveData";
import {PluginDataLoader} from "../../../libraries/types/pluginDataLoader";
import {importData} from "../../../libraries/helpers/oud/importData";
import {RootDataStore} from "../rootDataStore";
import {SettingsData} from "../../../libraries/types/savedata/oud/settingsData";
import {UsageData} from "../../../libraries/types/savedata/oud/usageData";
import {UnicodeData} from "../../../libraries/types/savedata/oud/unicodeData";
import {FavoritesData} from "../../../libraries/types/savedata/oud/favoritesData";

export class RootPluginDataStorage implements RootDataStore {


    constructor(
        private readonly storedData: PersistCache<SaveData>,
    ) {
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

    async getSettings(): Promise<SettingsData> {
        return (await this.storedData.get()).settings;
    }

    async overwriteSettings(settings: SettingsData): Promise<SettingsData> {
        const mergedData = await this.mergeData({
            settings: settings,
        });

        return mergedData.settings;
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

    async getFavorites(): Promise<FavoritesData> {
        return (await this.storedData.get()).favorites;
    }

    async overwriteFavorites(favorites: FavoritesData): Promise<FavoritesData> {
        const mergedData = await this.mergeData({
            favorites: favorites,
        });

        return mergedData.favorites;
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
