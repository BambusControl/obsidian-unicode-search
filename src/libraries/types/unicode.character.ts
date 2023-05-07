import {StatTracked} from "./stat-tracked";
import {Pinnable} from "./pinnable";

export interface UnicodeCharacter {
	name: string,
	char: string,
}

export type Character = UnicodeCharacter & Partial<StatTracked> & Partial<Pinnable>;
export type CharacterKeyType = UnicodeCharacter["char"];

export type CharacterWithKey = { char: CharacterKeyType };
export type PartialCharacter = CharacterWithKey & Partial<Character>
export type CharacterMap = Array<Character>;
export type CharacterMapOf<T extends Character> = Array<T>;

