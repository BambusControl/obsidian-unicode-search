import {Character} from "../../libraries/types/unicode.character";

export interface DataAccess {
	getCharacters(): Array<Character>;
}

