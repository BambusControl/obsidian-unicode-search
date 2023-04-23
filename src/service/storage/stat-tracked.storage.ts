import {
	CharacterKeyType,
	CharacterMapOf,
	UnicodeCharacterInfoModel,
} from "../../data/model/unicode-character-info.model";
import {StatTracked} from "../../data/type/stat-tracked";

export type StatTrackedCharacter = UnicodeCharacterInfoModel & Partial<StatTracked>;

export interface StatTrackedStorage {
	getAll(): Promise<CharacterMapOf<StatTrackedCharacter>>;

	recordUsage(id: CharacterKeyType): Promise<void>;
}
