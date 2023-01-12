import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {convertToUnicode} from "../utils/utils";
import {UnicodeCharacterService} from "./unicode-character.service";

export class UnicodeCharacterMockService implements UnicodeCharacterService {

	private readonly db: UnicodeCharacterInfoModel[];

	public constructor() {
		this.db = [
			{
				char: convertToUnicode("2190"),
				name: "Leftwards Arrow",
			},
			{
				char: convertToUnicode("2191"),
				name: "Upwards Arrow",
			},
			{
				char: convertToUnicode("2192"),
				name: "Rightwards Arrow",
			},
			{
				char: convertToUnicode("2193"),
				name: "Downwards Arrow",
			},
		];
	}

	public search(query: string): Promise<UnicodeCharacterInfoModel[]> {
		const lowerQuery = query.toLowerCase()

		return Promise.resolve(
			this.db.filter(ch => ch.name.contains(lowerQuery)),
		);
	}
}
