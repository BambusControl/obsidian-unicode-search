import {DateString} from "./usageInfo";

export interface FavoriteInfo {
    added: DateString;
    hotkey: boolean;
}

export interface ParsedFavoriteInfo {
    added: Date;
    hotkey: boolean;
}
