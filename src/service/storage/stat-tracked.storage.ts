import {CharacterKeyType, CharacterMapOf, UnicodeCharacter} from "../../data/unicode.character";
import {StatTracked} from "../../data/stat-tracked";

export type StatTrackedCharacter = UnicodeCharacter & Partial<StatTracked>;

export interface StatTrackedStorage {
	getAll(): Promise<CharacterMapOf<StatTrackedCharacter>>;

	recordUsage(id: CharacterKeyType): Promise<void>;
}
