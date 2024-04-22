import {request} from "obsidian";
import {UnicodeCharacter} from "../../../libraries/types/unicodeCharacter";
import {parse, ParseConfig, ParseResult, ParseWorkerConfig} from "papaparse";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {CharacterDownloader} from "../characterDownloader";
import {OptionsStore} from "../optionsStore";
import {CharacterCategory} from "../../../libraries/data/characterCategory";
import {CharacterClassifier} from "../../../libraries/data/characterClassifier";
import {CharacterFilterOptions} from "../../../libraries/types/characterFilterOptions";

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
        private readonly userOptionStore: OptionsStore,
    ) {
    }

    public async download(): Promise<UnicodeCharacter[]> {
        const characterFilter = await this.userOptionStore.getCharacterFilters();
        const unicodeData = await request("https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt");
        return await this.transformToCharacters(unicodeData, characterFilter);
    }

    private transformToCharacters(csvString: string, characterFilter: CharacterFilterOptions): Promise<UnicodeCharacter[]> {
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
                    .filter(char => UCDUserFilterDownloader.charFilter(char, characterFilter))
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

    private static charFilter(char: ParsedCharacter, characterFilter: CharacterFilterOptions): boolean {
        return (
            char != null
            && char.characterName != null
            && char.singleCodePoint != null
            && char.generalCategory != null
        ) && (
            UCDUserFilterDownloader.planeIncluded(char)
            || UCDUserFilterDownloader.blockIncluded(char)
            || UCDUserFilterDownloader.categoryIncluded(char, characterFilter)
        ) && !(
            UCDUserFilterDownloader.charExcluded(char)
        );
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

    private static categoryIncluded(char: ParsedCharacter, characterFilter: CharacterFilterOptions): boolean {
        /* TODO [characterFilter]: User filter for unicode category. */
        const categories = characterFilter.categories;
        return categories.contains(char.generalCategory as CharacterCategory);
    }

    private static charExcluded(char: ParsedCharacter): boolean {
        /* TODO [characterFilter]:: Exclusion criteria */
        // Omit characters that are classified as "Other"
        return char.generalCategory.startsWith(CharacterClassifier.Other)
    }

    private static intoUnicode(char: ParsedCharacter): UnicodeCharacter {
        return {
            char: String.fromCodePoint(parseInt(char.singleCodePoint, 16)),
            name: char.characterName.toLowerCase(),
        };
    }

}
