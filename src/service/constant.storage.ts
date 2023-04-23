import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {UNICODE_DATA} from "../configuration/unicode.data";
import {BaseStorage} from "./storage/base.storage";

export class ConstantStorage implements BaseStorage {

	private readonly data: UnicodeCharacterInfoModel[];

	public constructor() {
		this.data = UNICODE_DATA;
	}

	public getAll(): UnicodeCharacterInfoModel[] {
		return this.data;
	}

}
