import {UnicodeCodepoint} from "./unicode";



import {ParsedFavoriteInfo} from "../savedata/favoriteInfo";
import {UsageInfo} from "../savedata/usageInfo";

/**
 * Base representation of a character
 */
export type Character = UnicodeCodepoint;

export type UsedCharacter = Character & UsageInfo;
export type MaybeUsedCharacter = Character | UsedCharacter;

export type FavoriteCharacter = Character & ParsedFavoriteInfo;
export type MaybeFavoriteCharacter = Character | FavoriteCharacter;

/**
 * Character with attached metadata for use throughout the plugin
 */
export type MetadataCharacter = Character | UsedCharacter | FavoriteCharacter;

export type CharacterKey = Character["codepoint"];
