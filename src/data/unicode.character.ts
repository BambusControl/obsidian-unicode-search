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
export type CharacterMap = { [key: CharacterKeyType]: Character };
export type CharacterMapOf<T extends Character> = { [key: CharacterKeyType]: T };

export function compare(a: UnicodeCharacter, b: UnicodeCharacter ): number {
	if (a.char > b.char) {
		return 1;
	}

	if (a.char < b.char) {
		return -1;
	}

	return 0;
}

export function equals(a: UnicodeCharacter, b: UnicodeCharacter ): boolean {
	return a.char === b.char;
}
