import {request} from "obsidian";
import {UnicodeCharacter} from "../../libraries/types/unicode.character";
import {ParserOptionsArgs, parseString} from "@fast-csv/parse";

type ParsedCharacter = {
	singleCodePoint: string;
	characterName: string;
	generalCategory: string;
}

export class UcdService {

	private readonly parserOpts: ParserOptionsArgs = {
		headers: [
			"singleCodePoint",
			"characterName",
			"generalCategory",
			null, null, null, null, null, null, null, null, null, null, null, null,
		],
		delimiter: ";",
	};

	public async fetchCharacters(): Promise<UnicodeCharacter[]> {
		const result = await request("https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt");
		return await this.promiseMeData(result);
	}

	private promiseMeData(csvString: string): Promise<UnicodeCharacter[]> {
		// Predetermined size from testing
		const length = 15432;
		let i = 0;

		const results = new Array<UnicodeCharacter>(length);

		const stream = parseString<ParsedCharacter, ParsedCharacter>(csvString, this.parserOpts)
			.on("data", (char) => {
				if (UcdService.charFilter(char)) {
					results[i++] = UcdService.intoUnicode(char);
				}
			});

		return new Promise((resolve, reject) => {
			stream.on("error", (error) => reject(error))
				.on("end", () => resolve(results));
		});
	}

	private static charFilter(char: ParsedCharacter): boolean {
		return UcdService.planeIncluded(char)
			&& !UcdService.categoryExcluded(char)
			&& !UcdService.nameIsLabelInfo(char)
			;
	}

	private static planeIncluded(char: ParsedCharacter): boolean {
		// Only use the first plane
		return parseInt(char.singleCodePoint, 16) <= 0xFFFF;
	}

	private static categoryExcluded(char: ParsedCharacter): boolean {
		// No 'other' or 'marker'
		return char.generalCategory.startsWith("C")
			|| char.generalCategory.startsWith("M");
	}

	private static nameIsLabelInfo(char: ParsedCharacter): boolean {
		return char.characterName.startsWith("<")
			&& char.characterName.endsWith(">");
	}

	private static intoUnicode(char: ParsedCharacter): UnicodeCharacter {
		return {
			char: String.fromCodePoint(parseInt(char.singleCodePoint, 16)),
			name: char.characterName.toLowerCase(),
		};
	}

}
