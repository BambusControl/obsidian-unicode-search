import {UnicodeCharacterInfoModel} from "../../data/unicode-character-info.model";

export interface Storage {
	getAll(): Promise<UnicodeCharacterInfoModel[]>;
}
