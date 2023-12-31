import {Character, PartialCharacter} from "../../libraries/types/character";

export interface CharacterStore {
    loadCharacters(): Promise<Character[]>;
	// TODO: remove partials
    saveCharacter(data: Partial<Character>): Promise<Character>;
	saveCharacters(data: Partial<Character[]>): Promise<Character[]>;
	putCharacters(data: PartialCharacter[]): Promise<Character[]>;
}
