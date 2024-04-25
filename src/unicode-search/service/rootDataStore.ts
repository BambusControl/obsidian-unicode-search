import {SettingsData} from "../../libraries/types/savedata/settingsData";
import {UsageData} from "../../libraries/types/savedata/usageData";
import {UnicodeData} from "../../libraries/types/savedata/unicodeData";

import {SaveDataVersion} from "../../libraries/types/savedata/saveData";

export interface RootDataStore {
    isInitialized(): Promise<boolean>;
    setInitialized(value: boolean): Promise<void>
    getVersion(): Promise<SaveDataVersion>;

    getUnicode(): Promise<UnicodeData>
    overwriteUnicode(data: UnicodeData): Promise<UnicodeData>
    setInitializedUnicode(value: boolean): Promise<void>

    getSettings(): Promise<SettingsData>
    overwriteSettings(settings: SettingsData): Promise<SettingsData>
    setInitializedSettings(value: boolean): Promise<void>

    getUsage(): Promise<UsageData>
    overwriteUsage(usage: UsageData): Promise<UsageData>
    setInitializedUsage(value: boolean): Promise<void>
}
