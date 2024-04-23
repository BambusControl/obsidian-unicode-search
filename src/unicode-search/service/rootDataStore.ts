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

    getSettings(): Promise<SettingsData>
    saveSettings(settings: SettingsData): Promise<SettingsData>

    getUsage(): Promise<UsageData>
    saveUsage(usage: UsageData): Promise<UsageData>
}
