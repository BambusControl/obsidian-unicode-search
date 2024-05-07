import {request} from "obsidian";
import {parse, ParseConfig, ParseResult, ParseWorkerConfig} from "papaparse";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {CharacterCategoryGroup} from "../../../libraries/data/characterCategoryGroup";
import {Codepoints, UnicodeCodepoint} from "../../../libraries/types/codepoint/codepoint";
import {CharacterDownloader} from "../characterDownloader";
import {SettingsStore} from "../settingsStore";
import {mergeIntervals} from "../../../libraries/helpers/mergeIntervals";
import {codepointIn} from "../../../libraries/helpers/codePointIn";
import {CharacterCategoryType} from "../../../libraries/data/characterCategory";
import {CodepointInterval} from "../../../libraries/types/codepoint/codepointInterval";

export class UcdUserFilterDownloader implements CharacterDownloader {

    private readonly config: ParseConfig = {
        delimiter: ";",
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        fastMode: true,
    };

    public constructor(
        private readonly settingsStore: SettingsStore,
    ) {
    }

    public async download(): Promise<Codepoints> {
        const unicodeVersion = "14.0.0";
        const unicodeData = await request(`https://www.unicode.org/Public/${unicodeVersion}/ucd/UnicodeData.txt`);

        const parsed = await this.transformToCharacters(unicodeData);
        const filtered = await this.filterCharacters(parsed);
        return filtered.map(intoUnicodeCodepoint);
    }

    private async filterCharacters(parsed: ParsedCharacter[]): Promise<ParsedCharacter[]> {
        const filter = await this.settingsStore.getFilter();

        const includedBlocks = mergeIntervals(filter.planes
            .flatMap(p => p.blocks)
            .filter(b => b.included));

        const includedCategories = filter.categoryGroups
            .flatMap(p => p.categories)
            .filter(c => c.included)
            .map(c => c.abbreviation);

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
                        codepoint: parseInt(row[0], 16),
                        name: row[1],
                        category: row[2],
                    }));

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
    codepoint: number;
    name: string;
    category: string;
};

function containsNullValues(char: Partial<ParsedCharacter>): boolean {
    return char == null
        || char.name == null
        || char.codepoint == null
        || char.category == null
}

function includedInBlocks(character: Pick<ParsedCharacter, "codepoint">, includedBlocks: Array<CodepointInterval>): boolean {
    return includedBlocks.some(
        (block) => codepointIn(character.codepoint, block)
    );
}

function categoryIncluded(character: Pick<ParsedCharacter, "category">, includedCategories: Array<CharacterCategoryType>): boolean {
    return includedCategories.some(
        (category) => character.category === category
    );
}

function characterExcluded(character: ParsedCharacter): boolean {
    /* TODO [characterFilter]:: Exclusion criteria */
    // Omit characters that are classified as "Other"
    return character.category.startsWith(CharacterCategoryGroup.Other);
}

function intoUnicodeCodepoint(char: ParsedCharacter): UnicodeCodepoint {
    return {
        codepoint: String.fromCodePoint(char.codepoint),
        name: char.name.toLowerCase(),
        category: char.category
    };
}
