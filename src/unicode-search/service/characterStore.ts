import {Character, CharacterKeyType, UsedCharacter} from "../../libraries/types/character";

export interface CharacterStore {
	fetchAll(): Promise<Character[]>;

    fetchTouched(): Promise<UsedCharacter[]>

	recordUsage(id: CharacterKeyType): Promise<void>;
}
