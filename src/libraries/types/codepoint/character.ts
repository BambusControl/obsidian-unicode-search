import {UnicodeCodepoint} from "./codepoint";


import {ParsedUsageInfo} from "../savedata/oud/parsedUsageInfo";
import {ParsedFavoriteInfo} from "../savedata/oud/parsedFavoriteInfo";

/**
 * Base representation of a character
 */
export type Character = UnicodeCodepoint;

export type UsedCharacter = Character & ParsedUsageInfo;
export type MaybeUsedCharacter = Character | UsedCharacter;

export type FavoriteCharacter = Character & ParsedFavoriteInfo;
export type MaybeFavoriteCharacter = Character | FavoriteCharacter;

/**
 * Character with attached metadata for use throughout the plugin
 */
export type MetadataCharacter = Character | UsedCharacter | FavoriteCharacter;

export type CharacterKey = Character["codepoint"];
