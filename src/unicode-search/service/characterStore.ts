import {Character, CharacterKey, CharacterTransform} from "../../libraries/types/character";

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
    updateCharacter<Out>(key: CharacterKey, apply: CharacterTransform<Out>): Promise<Character & Out>;

    /**
     * Modify existing characters.
     * @param keyApplyMap transformation functions for all target characters
     */
    updateCharacters<Out>(
        keyApplyMap: Map<CharacterKey, CharacterTransform<Out>>
    ): Promise<Map<CharacterKey, Character & Out>>;

}
