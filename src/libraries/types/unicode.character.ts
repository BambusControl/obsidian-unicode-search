import {StatTracked} from "./stat-tracked";
import {Pinnable} from "./pinnable";

export interface UnicodeCharacter {
	name: string,
	char: string,
}

export type Character = UnicodeCharacter & Partial<StatTracked> & Partial<Pinnable>;
export type PinnedCharacter = UnicodeCharacter & Partial<Pinnable>;
export type StatTrackedCharacter = UnicodeCharacter & Partial<StatTracked>;

export type UnicodeCharacters = Array<UnicodeCharacter>;
export type Characters = Array<Character>;
export type PinnedCharacters = Array<PinnedCharacter>;
export type StatTrackedCharacters = Array<StatTrackedCharacter>;

export type CharacterKeyType = UnicodeCharacter["char"];
export type CharacterWithKey = { char: CharacterKeyType };
export type PartialCharacter = CharacterWithKey & Partial<Character>
