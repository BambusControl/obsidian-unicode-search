import {SettingsData} from "./settingsData";
import {UsageData} from "./usageData";
import {UnicodeData} from "./unicodeData";

/* TODO [NEXT]: Export JSON Schema with updated version */
/* TODO [NEXT]: Update comments for JSON Schema */
export interface SaveData {
    version: SaveDataVersion;
    initialized: boolean;

    settings: SettingsData;
    unicode: UnicodeData;
    usage: UsageData;
}

/**
 * Version of the save data schema.
 *
 * Must comply with RegEx:
 * ```^[0-9]+\\.[0-9]+\\.[0-9]+(?:-[A-Z]+)?$```
 */
export type SaveDataVersion
    = "0.4.0"
    | "0.5.0"
    /* TODO [NEXT]: Update Version */
    | "0.6.0-NEXT"
    // Update only if save data schema changed
    ;
