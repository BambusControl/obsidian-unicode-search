import {CharacterKeyType, CharacterMapOf, UnicodeCharacterInfoModel} from "../../data/unicode-character-info.model";
import {StatTracked} from "../../data/stat-tracked";

export type StatTrackedCharacter = UnicodeCharacterInfoModel & Partial<StatTracked>;

export interface StatTrackedStorage {
	getAll(): Promise<CharacterMapOf<StatTrackedCharacter>>;

	recordUsage(id: CharacterKeyType): Promise<void>;
}
