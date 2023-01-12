import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {unicodeData} from "../configuration/unicode.data";
import {UnicodeCharacterStorage} from "./unicode-character.storage";

export class UnicodeCharacterBakedService implements UnicodeCharacterStorage {

	private readonly data: UnicodeCharacterInfoModel[];

	public constructor() {
		this.data = unicodeData;
	}

	public getAll(): UnicodeCharacterInfoModel[] {
		return this.data;
	}

}

