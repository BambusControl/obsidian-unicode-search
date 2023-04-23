import {UnicodeCharacterInfoModel} from "../../data/model/unicode-character-info.model";

export interface Storage {
	getAll(): Promise<UnicodeCharacterInfoModel[]>;
}
