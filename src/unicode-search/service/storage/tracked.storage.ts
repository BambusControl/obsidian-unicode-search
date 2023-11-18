import {CharacterKeyType, UsageTrackedCharacter} from "../../../libraries/types/character";

export interface TrackedStorage {
	getAll(): Promise<UsageTrackedCharacter[]>;

	recordUsage(id: CharacterKeyType): Promise<void>;
}
