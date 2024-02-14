import {Character, CharacterKey, PartialCharacter} from "../../libraries/types/character";

export interface CharacterStore {

    /**
     * Retrieve all characters.
     */
    getCharacters(): Promise<Character[]>;

    /**
     * Replace the current set of characters completely.
     * @param characters
     */
	initializeCharacters(characters: Character[]): Promise<void>;

    /**
     * Add or replace (if present) a specific character.
     * @param character
     */
    placeCharacter(character: Character): Promise<void>;

    /**
     * Add or replace (if some are present) a specified set of characters.
     * @param characters
     */
    placeCharacters(characters: Character[]): Promise<void>;

    /**
     * Modify existing character.
     * @param key of the target character
     * @param apply transformation function
     */
    updateCharacter(key: CharacterKey, apply: (char: Character) => Character): Promise<Character>;

    /**
     * Modify existing characters.
     * @param keyApplyMap transformation functions for all target characters
     */
    updateCharacters(keyApplyMap: Map<CharacterKey, (char: Character) => Character>): Promise<Map<CharacterKey, Character>>;

}
