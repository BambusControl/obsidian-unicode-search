import {Character} from "../data/unicode.character";

export interface DataAccess {
	getCharacters(): Array<Character>;
}

