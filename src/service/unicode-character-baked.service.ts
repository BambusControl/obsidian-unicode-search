import {UnicodeCharacterService} from "./unicode-character.service";
import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {unicodeData} from "../configuration/unicode.data";

export class UnicodeCharacterBakedService implements UnicodeCharacterService {

	private readonly data: UnicodeCharacterInfoModel[];

	public constructor() {
		this.data = unicodeData;
	}

	public search(query: string): Promise<UnicodeCharacterInfoModel[]> {
		const lowerQuery = query.toLowerCase()

		return Promise.resolve(
			this.data.filter(ch => ch.name.contains(lowerQuery)),
		);
	}

}

