import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";

export interface UnicodeCharacterStorage {
	getAll(): UnicodeCharacterInfoModel[];

	getRandom(): UnicodeCharacterInfoModel;
}
