import {request} from "obsidian";
import {UnicodeCharacter} from "../../libraries/types/unicode.character";
import {parse, ParseConfig, ParseResult, ParseWorkerConfig} from "papaparse";
import {ObsidianUnicodeSearchError} from "../errors/obsidian-unicode-search.error";

type ParsedData = Array<string>;

type ParsedCharacter = {
	singleCodePoint: string;
	characterName: string;
	generalCategory: string;
};

export class UcdService {

	private readonly config: ParseConfig = {
		delimiter: ";",
		header: false,
		transformHeader: undefined,
		dynamicTyping: false,
		fastMode: true,
	};

	public async fetchCharacters(): Promise<UnicodeCharacter[]> {
		const result = await request("https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt");
		return await this.transformToCharacters(result);
	}

	private transformToCharacters(csvString: string): Promise<UnicodeCharacter[]> {
		return new Promise((resolve, reject) => {
			const completeFn = (results: ParseResult<ParsedData>): void => {
				if (results.errors.length !== 0) {
					reject(new ObsidianUnicodeSearchError("Error while parsing data from Unicode Character Database"));
				}

				const unicodeCharacters = results.data
					.map((row): ParsedCharacter => ({
						singleCodePoint: row[0],
						characterName: row[1],
						generalCategory: row[2],
					}))
					.filter(char => UcdService.charFilter(char))
					.map(pch => UcdService.intoUnicode(pch));

				resolve(unicodeCharacters);
			};

			const configuration: ParseWorkerConfig<ParsedData> = {
				...this.config,
				worker: true,
				complete: results => completeFn(results),
			};

			parse<ParsedData>(csvString, configuration);
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
