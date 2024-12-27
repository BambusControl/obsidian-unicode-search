import {SettingsData} from "../../libraries/types/savedata/oud/settingsData";
import {UsageData} from "../../libraries/types/savedata/oud/usageData";
import {UnicodeData} from "../../libraries/types/savedata/oud/unicodeData";
import {FavoritesData} from "../../libraries/types/savedata/oud/favoritesData";

export interface RootDataStore {
    isInitialized(): Promise<boolean>;
    setInitialized(value: boolean): Promise<void>
    isCurrentVersion(): Promise<boolean>;

    getUnicode(): Promise<UnicodeData>
    overwriteUnicode(data: UnicodeData): Promise<UnicodeData>
    setInitializedUnicode(value: boolean): Promise<void>

    getSettings(): Promise<SettingsData>
    overwriteSettings(settings: SettingsData): Promise<SettingsData>
    setInitializedSettings(value: boolean): Promise<void>
    setFilterSatisfied(value: boolean): Promise<void>

    getUsage(): Promise<UsageData>
    overwriteUsage(usage: UsageData): Promise<UsageData>
    setInitializedUsage(value: boolean): Promise<void>

    getFavorites(): Promise<FavoritesData>
    overwriteFavorites(favorites: FavoritesData): Promise<FavoritesData>
    setInitializedFavorites(value: boolean): Promise<void>
}
