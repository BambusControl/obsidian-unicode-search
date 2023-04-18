import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {UNICODE_DATA} from "../configuration/unicode.data";
import {ImmutableCharacterStorage} from "./storage/immutable-character.storage";

export class ConstantUnicodeStorage implements ImmutableCharacterStorage {

	private readonly data: UnicodeCharacterInfoModel[];

	public constructor() {
		this.data = UNICODE_DATA;
	}

	public getAll(): UnicodeCharacterInfoModel[] {
		return this.data;
	}

}
