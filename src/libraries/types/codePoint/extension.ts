import type { Favorite, ParsedFavorite } from "../savedata/favorite";
import type { RawUseRecord, UseRecord } from "../savedata/useRecord";
import type { CodePointKey } from "./unicode";

/**
 * Usage information of a specific codePoint as stored in save data
 * @see {@link CodePointUse} for parsed version
 */
export type RawCodePointUse = CodePointKey & RawUseRecord;

/**
 * Usage information of a specific codePoint, parsed for use in the plugin
 * @see {@link RawCodePointUse} for raw version
 */
export type CodePointUse = CodePointKey & UseRecord;

/**
 * Favorite information of a specific codePoint as stored in save data
 * @see {@link CodePointFavorite} for parsed version
 */
export type RawCodePointFavorite = CodePointKey & Favorite;

/**
 * Favorite information of a specific codePoint, parsed for use in the plugin
 * @see {@link RawCodePointFavorite} for raw version
 */
export type CodePointFavorite = CodePointKey & ParsedFavorite;
