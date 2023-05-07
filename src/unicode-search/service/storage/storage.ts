import {UnicodeCharacter} from "../../../libraries/types/unicode.character";

export interface Storage {
	getAll(): Promise<UnicodeCharacter[]>;
}
