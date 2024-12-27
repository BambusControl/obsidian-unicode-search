import {SettingsData} from "./settingsData";
import {UsageData} from "./usageData";
import {UnicodeData} from "./unicodeData";
import {Initializable} from "./initializable";
import {FavoritesData} from "./favoritesData";

export interface SaveData extends Initializable {
    version: SaveDataVersion;

    settings: SettingsData;
    unicode: UnicodeData;
    usage: UsageData;
    favorites: FavoritesData;
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
    | "0.6.0"
    | "0.6.1-NEXT"
    // Update only if save data schema changed
    ;


export type CurrentSaveDataVersion = "0.6.1-NEXT" & SaveDataVersion;
export const CURRENT_VERSION: CurrentSaveDataVersion = "0.6.1-NEXT";
