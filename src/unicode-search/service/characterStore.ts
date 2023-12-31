import {Character, PartialCharacter} from "../../libraries/types/character";

export interface CharacterStore {
    loadCharacters(): Promise<Character[]>;
    saveCharacter(data: Character): Promise<void>;
    putCharacter(data: PartialCharacter): Promise<void>;
	saveCharacters(data: Character[]): Promise<void>;
	putCharacters(data: PartialCharacter[]): Promise<void>;
}
