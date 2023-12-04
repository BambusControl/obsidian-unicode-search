import {Character} from "../../libraries/types/character";

export interface CharacterService {
	getCharacters(): Character[];
}

