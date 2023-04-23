import {StatTracked} from "../type/stat-tracked";
import {Pinnable} from "../type/pinnable";

export interface UnicodeCharacterInfoModel {
	name: string,
	char: string,
}

export type Character = UnicodeCharacterInfoModel & Partial<StatTracked> & Partial<Pinnable>;
export type CharacterKeyType = UnicodeCharacterInfoModel["char"];

export type CharacterWithKey = { char: CharacterKeyType };
export type PartialCharacter = CharacterWithKey & Partial<Character>
export type CharacterMap = { [key: CharacterKeyType]: Character };
export type CharacterMapOf<T extends Character> = { [key: CharacterKeyType]: T };

export function compare(a: UnicodeCharacterInfoModel, b: UnicodeCharacterInfoModel ): number {
	if (a.char > b.char) {
		return 1;
	}

	if (a.char < b.char) {
		return -1;
	}

	return 0;
}

export function equals(a: UnicodeCharacterInfoModel, b: UnicodeCharacterInfoModel ): boolean {
	return a.char === b.char;
}
