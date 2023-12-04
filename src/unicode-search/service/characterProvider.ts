import {Character} from "../../libraries/types/character";

export interface CharacterProvider {
	getCharacters(): Character[];
}

