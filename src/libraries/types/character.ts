import {UsageInfo} from "./usage-info";
import {UnicodeCharacter} from "./unicode.character";

/**
 * Base representation of a character
 */
export type Character = UnicodeCharacter & Partial<UsageInfo>;

export type UsageTrackedCharacter = UnicodeCharacter & Partial<UsageInfo>;

export type CharacterKeyType = UnicodeCharacter["char"];
export type CharacterWithKey = { char: CharacterKeyType };
export type PartialCharacter = CharacterWithKey & Partial<Character>
