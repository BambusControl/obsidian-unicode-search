import {SettingsData} from "../../libraries/types/savedata/oud/settingsData";
import {UsageData} from "../../libraries/types/savedata/oud/usageData";
import {UnicodeData} from "../../libraries/types/savedata/oud/unicodeData";
import {FavoritesData} from "../../libraries/types/savedata/oud/favoritesData";

export interface RootDataStore {
    getUnicode(): Promise<UnicodeData>
    overwriteUnicode(data: UnicodeData): Promise<UnicodeData>

    getSettings(): Promise<SettingsData>
    overwriteSettings(settings: SettingsData): Promise<SettingsData>

    getUsage(): Promise<UsageData>
    overwriteUsage(usage: UsageData): Promise<UsageData>

    getFavorites(): Promise<FavoritesData>
    overwriteFavorites(favorites: FavoritesData): Promise<FavoritesData>
}
