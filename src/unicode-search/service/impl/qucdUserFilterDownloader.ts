import {request} from "obsidian";
import {parse, ParseConfig, ParseResult, ParseWorkerConfig} from "papaparse";
import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";
import {QCharacterDownloader} from "../characterDownloader";
import {CharacterClassifier} from "../../../libraries/data/characterClassifier";

import {
    QCodePoint,
    QCodePointAttribute,
    QUnicodeData
} from "../../../libraries/types/data/QCodePointAttribute";
import {QtOptionsStore} from "../qOptionsStore";
import {QFilter} from "../../../libraries/types/data/QSaveData";

type ParsedData = Array<string>;

type ParsedCharacter = {
    singleCodePoint: string;
    characterName: string;
    classifier: string;
};

export class QUCDUserFilterDownloader implements QCharacterDownloader {

    private readonly config: ParseConfig = {
        delimiter: ";",
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        fastMode: true,
    };

    public constructor(
        private readonly optionsStore: QtOptionsStore,
    ) {
    }

    public async download(): Promise<QUnicodeData> {
        /* TODO [Character download filter]
        * await this.optionsStore.getCharacterFilters();
        */
        const characterFilter = {
            categories: {},
            planes: {
                blocks: {}
            }
        } as QFilter

        const unicodeVersion = "14.0.0"
        const unicodeData = await request(`https://www.unicode.org/Public/${unicodeVersion}/ucd/UnicodeData.txt`);
        return await this.transformToCharacters(unicodeData, characterFilter);
    }

    private transformToCharacters(csvString: string, characterFilter: QFilter): Promise<QUnicodeData> {
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

                resolve(new Map(unicodeCharacters));
            };

            const configuration: ParseWorkerConfig<ParsedData> = {
                ...this.config,
                worker: true,
                complete: results => completeFn(results),
            };

            parse<ParsedData>(csvString, configuration);
        });
    }

    private static charFilter(char: ParsedCharacter, characterFilter: QFilter): boolean {
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

    private static categoryIncluded(char: ParsedCharacter, characterFilter: QFilter): boolean {
        /* TODO [characterFilter]: User filter for unicode category.
        *
        * const categories = characterFilter.categories;
        * return categories.contains(char.classifier as CharacterCategory);
        */
        return true;
    }

    private static charExcluded(char: ParsedCharacter): boolean {
        /* TODO [characterFilter]:: Exclusion criteria */
        // Omit characters that are classified as "Other"
        return char.classifier.startsWith(CharacterClassifier.Other)
    }

    private static intoUnicode(char: ParsedCharacter): readonly [QCodePoint, QCodePointAttribute] {
        return [
            String.fromCodePoint(parseInt(char.singleCodePoint, 16)),
            {
                name: char.characterName.toLowerCase(),
                classifier: char.classifier
            } as QCodePointAttribute
        ];
    }

}
