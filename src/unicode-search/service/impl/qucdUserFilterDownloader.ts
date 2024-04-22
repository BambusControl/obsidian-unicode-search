import {request} from "obsidian";
import {UnicodeCharacter} from "../../../libraries/types/unicodeCharacter";
import {parse, ParseConfig, ParseResult, ParseWorkerConfig} from "papaparse";
import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";
import {CharacterDownloader} from "../characterDownloader";
import {OptionsStore} from "../optionsStore";
import {CharacterCategory} from "../../../libraries/data/characterCategory";
import {CharacterClassifier} from "../../../libraries/data/characterClassifier";
import {CharacterFilterOptions} from "../../../libraries/types/characterFilterOptions";

import {QCodePointAttribute} from "../../../libraries/types/data/QCodePointAttribute";

type ParsedData = Array<string>;

type ParsedCharacter = {
    singleCodePoint: string;
    characterName: string;
    classifier: string;
};

export class QUCDUserFilterDownloader implements CharacterDownloader {

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
        const unicodeVersion = "14.0.0"
        const unicodeData = await request(`https://www.unicode.org/Public/UCD/${unicodeVersion}/ucd/UnicodeData.txt`);
        return await this.transformToCharacters(unicodeData, characterFilter);
    }

    private transformToCharacters(csvString: string, characterFilter: CharacterFilterOptions): Promise<UnicodeCharacter[]> {
        return new Promise((resolve, reject) => {
            const completeFn = (results: ParseResult<ParsedData>): void => {
                if (results.errors.length !== 0) {
                    reject(new ObsidianUnicodeSearchError("Error while parsing data from Unicode Character Database"));
                }

                const unicodeCharacters = results.data
                    .map((row): ParsedCharacter => ({
                        singleCodePoint: row[0],
                        characterName: row[1],
                        classifier: row[2],
                    }))
                    .filter(char => QUCDUserFilterDownloader.charFilter(char, characterFilter))
                    .map(pch => QUCDUserFilterDownloader.intoUnicode(pch));

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
            && char.classifier != null
        ) && (
            QUCDUserFilterDownloader.planeIncluded(char)
            || QUCDUserFilterDownloader.blockIncluded(char)
            || QUCDUserFilterDownloader.categoryIncluded(char, characterFilter)
        ) && !(
            QUCDUserFilterDownloader.charExcluded(char)
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
        return categories.contains(char.classifier as CharacterCategory);
    }

    private static charExcluded(char: ParsedCharacter): boolean {
        /* TODO [characterFilter]:: Exclusion criteria */
        // Omit characters that are classified as "Other"
        return char.classifier.startsWith(CharacterClassifier.Other)
    }

    private static intoUnicode(char: ParsedCharacter): QCodePointAttribute {
        return {
            char: String.fromCodePoint(parseInt(char.singleCodePoint, 16)),
            name: char.characterName.toLowerCase(),
            classifier: char.classifier
        };
    }

}
