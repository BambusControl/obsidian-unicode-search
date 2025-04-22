import {DateString} from "./usageInfo";

/**
 * Raw favorite information, as stored in save data
 */
export interface FavoriteInfo {
    /**
     * Date when the codepoint was added to favorites
     */
    added: DateString;

    /**
     * Whether the codepoint has a hotkey command
     */
    hotkey: boolean;
}

/**
 * Parsed favorite information for use in the plugin
 */
export interface ParsedFavoriteInfo {
    /**
     * Date when the codepoint was added to favorites
     */
    added: Date;

    /**
     * Whether the codepoint has a hotkey command
     */
    hotkey: boolean;
}
