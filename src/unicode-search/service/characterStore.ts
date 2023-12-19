import {Character} from "../../libraries/types/character";

export interface CharacterStore {
    loadCharacters(): Promise<Character[]>;
	saveCharacters(data: Partial<Character[]>): Promise<Character[]>;
	saveCharacter(data: Partial<Character>): Promise<Character>;
}
