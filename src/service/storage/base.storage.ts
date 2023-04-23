import {UnicodeCharacterInfoModel} from "../../data/model/unicode-character-info.model";
import {StatTracked} from "../../data/type/stat-tracked";

export interface BaseStorage {
	getAll(): UnicodeCharacterInfoModel[];
}

export interface StatTrackedStorage {
	getAll(): (UnicodeCharacterInfoModel & StatTracked)[];
	recordUsage(id: UnicodeCharacterInfoModel["char"]): void;
}

export interface PinnedStorage {
	getAll(): UnicodeCharacterInfoModel[];
	pin(id: UnicodeCharacterInfoModel["char"], order: number): void;
	unpin(id: UnicodeCharacterInfoModel["char"]): void;
}
