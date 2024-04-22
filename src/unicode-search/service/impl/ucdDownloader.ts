import {request} from "obsidian";
import {UnicodeCharacter} from "../../../libraries/types/unicodeCharacter";
import {parse, ParseConfig, ParseResult, ParseWorkerConfig} from "papaparse";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {CharacterDownloader} from "../characterDownloader";

type ParsedData = Array<string>;

type ParsedCharacter = {
	singleCodePoint: string;
	characterName: string;
	generalCategory: string;
};

/**
 * Unicode Character Database Downloader
 */
export class UCDDownloader implements CharacterDownloader {

	private readonly config: ParseConfig = {
		delimiter: ";",
		header: false,
		transformHeader: undefined,
		dynamicTyping: false,
		fastMode: true,
	};

    async download(): Promise<UnicodeCharacter[]> {
        const result = await request("https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt");
        return await this.transformToCharacters(result);
    }

    private transformToCharacters(csvString: string): Promise<UnicodeCharacter[]> {
		return new Promise((resolve, reject) => {
			const completeFn = (results: ParseResult<ParsedData>): void => {
				if (results.errors.length !== 0) {
					reject(new UnicodeSearchError("Error while parsing data from Unicode Character Database"));
				}

				const unicodeCharacters = results.data
					.map((row): ParsedCharacter => ({
						singleCodePoint: row[0],
						characterName: row[1],
						generalCategory: row[2],
					}))
					.filter(char => UCDDownloader.charFilter(char))
					.map(pch => UCDDownloader.intoUnicode(pch));

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
		return UCDDownloader.planeIncluded(char)
			&& !UCDDownloader.categoryExcluded(char)
			&& !UCDDownloader.nameIsLabelInfo(char)
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
