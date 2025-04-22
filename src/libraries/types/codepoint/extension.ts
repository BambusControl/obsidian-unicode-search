import {FavoriteInfo as RawFavoriteInfo, ParsedFavoriteInfo as FavoriteInfo} from "../savedata/favoriteInfo";
import {UsageInfo as UseInfo, RawUsageInfo as RawUseInfo} from "../savedata/usageInfo";
import {CodepointKey} from "./unicode";

/**
 * Usage information of a specific codepoint as stored in save data
 * @see {@link CodepointUse} for parsed version
 */
export type RawCodepointUse = CodepointKey & RawUseInfo;

/**
 * Usage information of a specific codepoint, parsed for use in the plugin
 * @see {@link RawCodepointUse} for raw version
 */
export type CodepointUse = CodepointKey & UseInfo;

/**
 * Favorite infor of a specific codepoint as stored in save data
 * @see {@link CodepointFavorite} for parsed version
 */
export type RawCodepointFavorite = CodepointKey & RawFavoriteInfo;

/**
 * Favorite information of a specific codepoint, parsed for use in the plugin
 * @see {@link RawCodepointFavorite} for raw version
 */
export type CodepointFavorite = CodepointKey & FavoriteInfo;
