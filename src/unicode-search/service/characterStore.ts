import {Character, CharacterKey, PartialCharacter} from "../../libraries/types/character";

export interface CharacterStore {
    getCharacters(): Promise<Character[]>;
    saveCharacter(data: Character): Promise<void>;
    putCharacter(data: PartialCharacter): Promise<void>;
    modifyCharacter(char: CharacterKey, map: (char: Character) => Character): Promise<Character>;
	saveCharacters(data: Character[]): Promise<void>;
	putCharacters(data: PartialCharacter[]): Promise<void>;
    // modifyCharacters(mapppings: { [key: CharacterKey]:  (char: Character) => Character }): Promise<{[key: CharacterKey]: Character}>;
    modifyCharacters(mapppings: Map<CharacterKey, (char: Character) => Character>): Promise<Map<CharacterKey, Character>>;
}
