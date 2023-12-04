import {CharacterKeyType, UsageTrackedCharacter} from "../../libraries/types/character";

export interface CharacterStore {
	getAll(): Promise<UsageTrackedCharacter[]>;

	recordUsage(id: CharacterKeyType): Promise<void>;
}
