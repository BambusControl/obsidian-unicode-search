import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {convertToUnicode} from "../utils/utils";
import {UnicodeCharacterService} from "./unicode-character.service";

export class UnicodeCharacterMockService implements UnicodeCharacterService {

	private readonly db: UnicodeCharacterInfoModel[];

	public constructor() {
		this.db = [
			{
				char: convertToUnicode("2190"),
				description: "Leftwards Arrow",
			},
			{
				char: convertToUnicode("2191"),
				description: "Upwards Arrow",
			},
			{
				char: convertToUnicode("2192"),
				description: "Rightwards Arrow",
			},
			{
				char: convertToUnicode("2193"),
				description: "Downwards Arrow",
			},
		];
	}

	public search(query: string): Promise<UnicodeCharacterInfoModel[]> {
		return Promise.resolve(
			this.db.filter(ch => ch.description.contains(query)),
		);
	}
}
