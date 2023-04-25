import {Character} from "../data/unicode-character-info.model";

export interface DataAccess {
	getCharacters(): Array<Character>;
}

