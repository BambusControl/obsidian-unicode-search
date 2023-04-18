import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";

export interface PersistentSuggestionStorage {
	get(): UnicodeCharacterInfoModel;

	getAll(): UnicodeCharacterInfoModel[];

	store(character: UnicodeCharacterInfoModel): void;
}
