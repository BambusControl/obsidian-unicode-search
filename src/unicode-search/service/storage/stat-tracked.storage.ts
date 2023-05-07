import {CharacterKeyType, StatTrackedCharacters} from "../../../libraries/types/unicode.character";

export interface StatTrackedStorage {
	getAll(): Promise<StatTrackedCharacters>;

	recordUsage(id: CharacterKeyType): Promise<void>;
}
