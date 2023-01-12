import {UnicodeCharacterService} from "./unicode-character.service";
import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";

export class UnicodeCharacterLocalService implements UnicodeCharacterService {

	private readonly data: UnicodeCharacterInfoModel[];

	public constructor() {
		this.data = [];
	}

	public search(query: string): Promise<UnicodeCharacterInfoModel[]> {
		const lowerQuery = query.toLowerCase();

		return Promise.resolve(
			this.data.filter(ch => ch.name.contains(lowerQuery)),
		);
	}

}
