import {request} from "obsidian";
import {parse, ParseConfig, ParseResult, ParseWorkerConfig} from "papaparse";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {CharacterClassifier} from "../../../libraries/data/characterClassifier";
import {QCodePointData} from "../../../libraries/types/data/QCodePointData";
import {QCharacterDownloader} from "../QCharacterDownloader";
import {QUnicodeCodePointWithAttributes} from "../../../libraries/types/data/QUnicodeCodePointWithAttributes";
import {QSettingsStore} from "../QSettingsStore";
import {mergeIntervals} from "../../../libraries/helpers/mergeIntervals";
import {CodePointInterval} from "../../../libraries/types/codePointInterval";
import {codePointIn} from "../../../libraries/helpers/codePointIn";
import {CharacterCategory} from "../../../libraries/data/characterCategory";

export class QUCDUserFilterDownloader implements QCharacterDownloader {

    private readonly config: ParseConfig = {
        delimiter: ";",
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        fastMode: true,
    };

    public constructor(
        private readonly settingsStore: QSettingsStore,
    ) {
    }

    public async download(): Promise<QCodePointData> {
        const unicodeVersion = "14.0.0"
        const unicodeData = await request(`https://www.unicode.org/Public/${unicodeVersion}/ucd/UnicodeData.txt`);

        const parsed = await this.transformToCharacters(unicodeData);
        const filtered = await this.filterCharacters(parsed);
        return filtered.map(intoUnicodeCodePoint);
    }

    private async filterCharacters(parsed: ParsedCharacter[]): Promise<ParsedCharacter[]> {
        const filter = await this.settingsStore.getFilter()

        const includedBlocks = mergeIntervals(filter.planes
            .flatMap(p => p.blocks)
            .filter(b => b.included));

        const includedCategories = filter.classifiers
            .flatMap(p => p.categories)
            .filter(c => c.included);

        return parsed.filter(char =>
            !containsNullValues(char)
            && includedInBlocks(char, includedBlocks)
            && categoryIncluded(char, includedCategories)
            && !characterExcluded(char)
        );
    }

    private transformToCharacters(csvString: string): Promise<ParsedCharacter[]> {
        return new Promise((resolve, reject) => {
            const completeFn = (results: ParseResult<ParsedData>): void => {
                if (results.errors.length !== 0) {
                    reject(new UnicodeSearchError("Error while parsing data from Unicode Character Database"));
                }

                const parsedCharacters = results.data
                    .map((row): ParsedCharacter => ({
                        codePoint: parseInt(row[0], 16),
                        name: row[1],
                        category: row[2],
                    }))

                resolve(parsedCharacters);
            };

            const configuration: ParseWorkerConfig<ParsedData> = {
                ...this.config,
                worker: true,
                complete: results => completeFn(results),
            };

            parse<ParsedData>(csvString, configuration);
        });
    }

}

type ParsedData = Array<string>;

type ParsedCharacter = {
    codePoint: number;
    name: string;
    category: string;
};

function containsNullValues(char: Partial<ParsedCharacter>): boolean {
    return char == null
        || char.name == null
        || char.codePoint == null
        || char.category == null
}

function includedInBlocks(character: Pick<ParsedCharacter, "codePoint">, includedBlocks: Array<CodePointInterval>): boolean {
    return includedBlocks.some(
        (block) => codePointIn(character.codePoint, block)
    );
}

function categoryIncluded(character: Pick<ParsedCharacter, "category">, includedCategories: Array<CharacterCategory>): boolean {
    return includedCategories.some(
        (category) => character.category === category
    );
}

function characterExcluded(character: ParsedCharacter): boolean {
    /* TODO [characterFilter]:: Exclusion criteria */
    // Omit characters that are classified as "Other"
    return character.category.startsWith(CharacterClassifier.Other);
}

function intoUnicodeCodePoint(char: ParsedCharacter): QUnicodeCodePointWithAttributes {
    return {
        codePoint: String.fromCodePoint(char.codePoint),
        name: char.name.toLowerCase(),
        category: char.category
    };
}
