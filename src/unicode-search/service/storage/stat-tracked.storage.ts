import {CharacterKeyType, CharacterMapOf, UnicodeCharacter} from "../../../libraries/types/unicode.character";
import {StatTracked} from "../../../libraries/types/stat-tracked";

export type StatTrackedCharacter = UnicodeCharacter & Partial<StatTracked>;

export interface StatTrackedStorage {
	getAll(): Promise<CharacterMapOf<StatTrackedCharacter>>;

	recordUsage(id: CharacterKeyType): Promise<void>;
}
