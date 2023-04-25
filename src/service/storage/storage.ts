import {UnicodeCharacter} from "../../data/unicode.character";

export interface Storage {
	getAll(): Promise<UnicodeCharacter[]>;
}
