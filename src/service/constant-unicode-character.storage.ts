import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {UNICODE_DATA} from "../configuration/unicode.data";
import {UnicodeCharacterStorage} from "./unicode-character.storage";

export class ConstantUnicodeCharacterStorage implements UnicodeCharacterStorage {

	private readonly data: UnicodeCharacterInfoModel[];

	public constructor() {
		this.data = UNICODE_DATA;
	}

	public getAll(): UnicodeCharacterInfoModel[] {
		return this.data;
	}

	public getRandom(): UnicodeCharacterInfoModel {
		const index: number = Math.floor(Math.random() * this.data.length);
		return this.data[index];
	}

}

