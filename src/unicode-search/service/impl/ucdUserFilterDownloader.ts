import {request} from "obsidian";
import {UnicodeCharacter} from "../../../libraries/types/unicodeCharacter";
import {parse, ParseConfig, ParseResult, ParseWorkerConfig} from "papaparse";
import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";
import {CharacterDownloader} from "../characterDownloader";
import {UserOptionStore} from "../userOptionStore";
import {UserOptions} from "../../../libraries/types/userOptions";
import {UnicodeSubcategory} from "../../../libraries/types/unicodeCategory";

type ParsedData = Array<string>;

type ParsedCharacter = {
    singleCodePoint: string;
    characterName: string;
    generalCategory: string;
};

/**
 * Unicode Character Database Downloader
 */
export class UCDUserFilterDownloader implements CharacterDownloader {

    private readonly config: ParseConfig = {
        delimiter: ";",
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        fastMode: true,
    };


    public constructor(
        private readonly userOptionStore: UserOptionStore,
    ) {
    }

    public async download(): Promise<UnicodeCharacter[]> {
        const userOptions = await this.userOptionStore.getUserOptions();
        const unicodeData = await request("https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt");
        return await this.transformToCharacters(unicodeData, userOptions);
    }

    private transformToCharacters(csvString: string, userOptions: UserOptions): Promise<UnicodeCharacter[]> {
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
                    .filter(char => UCDUserFilterDownloader.charFilter(char, userOptions))
                    .map(pch => UCDUserFilterDownloader.intoUnicode(pch));

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

    private static charFilter(char: ParsedCharacter, userOptions: UserOptions): boolean {
        return char != null
            && char.characterName != null
            && char.singleCodePoint != null
            && char.generalCategory != null
            && UCDUserFilterDownloader.planeIncluded(char)
            && UCDUserFilterDownloader.blockIncluded(char)
            && UCDUserFilterDownloader.categoryIncluded(char, userOptions)
            && UCDUserFilterDownloader.nameIsNotLabelInfo(char)
            ;
    }

    private static planeIncluded(char: ParsedCharacter): boolean {
        /* TODO [characterFilter]: User filter for unicode plane.
        * Planes are made up of blocks.
        */
        return true;
    }

    private static blockIncluded(char: ParsedCharacter): boolean {
        /* TODO [characterFilter]: User filter for unicode plane.
        * Planes have blocks - they don't overlap - I've no clue where to get their names.
        */
        return true;
    }

    private static scriptIncluded(char: ParsedCharacter): boolean {
        /* TODO [characterFilter]: User filter for unicode plane.
        * Scripts are sets of characters - are they sets of blocks?
        */
        return true;
    }

    private static categoryIncluded(char: ParsedCharacter, userOptions: UserOptions): boolean {
        /* TODO [characterFilter]: User filter for unicode category. */
        const categories = userOptions.characterFilter.unicodeSubcategories;
        return categories.contains(char.generalCategory as UnicodeSubcategory);
    }

    private static nameIsNotLabelInfo(char: ParsedCharacter): boolean {
        /* TODO [characterFilter]: Should label info filterable by user? */
        return !(char.characterName.startsWith("<")
            && char.characterName.endsWith(">"));
    }

    private static intoUnicode(char: ParsedCharacter): UnicodeCharacter {
        return {
            char: String.fromCodePoint(parseInt(char.singleCodePoint, 16)),
            name: char.characterName.toLowerCase(),
        };
    }

}
