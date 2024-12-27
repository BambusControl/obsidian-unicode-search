import {SaveData} from "../../types/savedata/oud/saveData";
import {SettingsData} from "../../types/savedata/oud/settingsData";
import {UnicodeData} from "../../types/savedata/oud/unicodeData";
import {UsageData} from "../../types/savedata/oud/usageData";

export function isTypeSaveData(object: Partial<SaveData>): object is SaveData {
    return object != null
        && "initialized" in object
        && "version" in object
        && "settings" in object
        && isTypeSettings(object.settings ?? {})
        && "usage" in object
        && isTypeUsage(object.usage ?? {})
        && "unicode" in object
        && isTypeUnicode(object.unicode ?? {})
        ;
}

function isTypeSettings(object: Partial<SettingsData>): object is SettingsData {
    return "initialized" in object;
}

function isTypeUnicode(object: Partial<UnicodeData>): object is UnicodeData {
    return "initialized" in object;
}

function isTypeUsage(object: Partial<UsageData>): object is UsageData {
    return "initialized" in object;
}

