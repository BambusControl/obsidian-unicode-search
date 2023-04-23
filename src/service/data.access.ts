import {Character} from "../data/model/unicode-character-info.model";

export interface DataAccess {
	getCharacters(): Array<Character>;
}

