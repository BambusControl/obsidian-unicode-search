import {Character, CharacterKey, UsedCharacter} from "../../libraries/types/character";

export interface CharacterService {
	getAll(): Promise<Character[]>;
    getUsed(): Promise<UsedCharacter[]>
	recordUsage(id: CharacterKey): Promise<void>;
}
