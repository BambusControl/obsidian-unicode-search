import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";

export interface UnicodeCharacterService {
	search(query: string): Promise<UnicodeCharacterInfoModel[]>;
}
