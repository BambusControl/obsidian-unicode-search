import {Character} from "../../libraries/types/character";

export interface DataAccess {
	getCharacters(): Character[];
}

