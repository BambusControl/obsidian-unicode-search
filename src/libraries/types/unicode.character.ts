import {UsageInfo} from "./usage-info";
import {Pinnable} from "./pinnable";

export interface UnicodeCharacter {
    /**
     * A single character defined by a Unicode Codepoint
     * @maxLength 1
     * @minLength 1
     */
    char: string,

    /**
     * Unicode provided description of the character
     */
    name: string,
}

/**
 * Base representation of a character
 */
export type Character = UnicodeCharacter & Partial<UsageInfo> & Partial<Pinnable>;
export type PinnedCharacter = UnicodeCharacter & Partial<Pinnable>;
export type UsageTrackedCharacter = UnicodeCharacter & Partial<UsageInfo>;

export type UnicodeCharacters = Array<UnicodeCharacter>;
export type Characters = Array<Character>;
export type PinnedCharacters = Array<PinnedCharacter>;
export type StatTrackedCharacters = Array<UsageTrackedCharacter>;

export type CharacterKeyType = UnicodeCharacter["char"];
export type CharacterWithKey = { char: CharacterKeyType };
export type PartialCharacter = CharacterWithKey & Partial<Character>
