import {Character, CharacterKeyType} from "../../libraries/types/character";

export interface CharacterStore {
	fetchAll(): Promise<Character[]>;

	recordUsage(id: CharacterKeyType): Promise<void>;
}
