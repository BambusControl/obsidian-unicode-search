import {UsageInfo} from "./usageInfo";
import {UnicodeCharacter} from "./unicodeCharacter";

/**
 * Base representation of a character
 */
export type Character = UnicodeCharacter & Partial<UsageInfo>;

export type CharacterKeyType = UnicodeCharacter["char"];
export type CharacterWithKey = { char: CharacterKeyType };
export type PartialCharacter = CharacterWithKey & Partial<Character>
