import {Character, CharacterKeyType, UsedCharacter} from "../../libraries/types/character";

export interface CharacterService {
	getAll(): Promise<Character[]>;
    getUsed(): Promise<UsedCharacter[]>
	recordUsage(id: CharacterKeyType): Promise<void>;
}
