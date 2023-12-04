import {Character} from "../../libraries/types/character";

export interface CharacterDataStore {
	fetchCharacters(): Promise<Character[]>;

	exportCharacters(data: Partial<Character[]>): Promise<Character[]>;

	exportCharacter(data: Partial<Character>): Promise<Character>;

	isSaveDataInitialized(): Promise<boolean>;

	setSaveDataAsInitialized(): Promise<void>;
}

