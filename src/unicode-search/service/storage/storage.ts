import {UnicodeCharacters} from "../../../libraries/types/unicode.character";

export interface Storage {
	getAll(): Promise<UnicodeCharacters>;
}
