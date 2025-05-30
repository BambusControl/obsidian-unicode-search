import {getIcon, Notice, request, requestUrl} from "obsidian";
import {parse, ParseConfig, ParseResult, ParseWorkerConfig} from "papaparse";
import {UnicodeSearchError} from "../errors/unicodeSearchError";
import {UnicodeCodepoint} from "../../libraries/types/codepoint/unicode";
import {CharacterDownloader} from "./characterDownloader";
import {FilterStore} from "./filterStore";
import {mergeIntervals} from "../../libraries/helpers/mergeIntervals";
import {codepointIn} from "../../libraries/helpers/codePointIn";
import {CharacterCategoryType} from "../../libraries/data/characterCategory";
import {CodepointInterval} from "../../libraries/types/codepoint/codepointInterval";

export class UcdUserFilterDownloader implements CharacterDownloader {

    private readonly config: ParseConfig = {
        delimiter: ";",
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        fastMode: true,
    };

    public constructor(
        private readonly filterStore: FilterStore,
    ) {
    }

    public async download(): Promise<UnicodeCodepoint[]> {
        /* NOTE: You must also push a GIT mirror of the UCD version to the `ucd-mirror` branch */
        const unicodeVersion = "14.0.0";

        let info = "Unicode Search: Character Database Update";
        info += `\nUCD version ${unicodeVersion}`
        const notice = new Notice(info, 0);

        const sourceUcd = "https://www.unicode.org";
        const sourceGit = "https://raw.githubusercontent.com/BambusControl/obsidian-unicode-search/refs/heads/ucd-mirror"
        const path = `Public/${unicodeVersion}/ucd/UnicodeData.txt`

        let response = await requestUrl({url: `${sourceUcd}/${path}`, throw: false});

        if (response.status != 200) {
            info += `\n✗ Failed to download from Unicode: HTTP ${response.status}`;
            notice.setMessage(info)

            response = await requestUrl({url: `${sourceGit}/${path}`, throw: false});

            if (response.status != 200) {
                info += `\n✗ Failed to download from GIT: HTTP ${response.status}`;
                notice.setMessage(info)
                return [];
            }
        }

        info = info + `\n✓ Successfully downloaded characters`;

        const parsed = await this.transformToCharacters(response.text);
        const filtered = await this.filterCharacters(parsed);
        const unicode = filtered.map(intoUnicodeCodepoint);

        info += `\n✱ Filtered ${unicode.length} out of ${parsed.length} total characters`;
        notice.setMessage(info);
        setTimeout(() => notice.hide(), 6 * 1000);

        return unicode;
    }

    private async filterCharacters(parsed: ParsedCharacter[]): Promise<ParsedCharacter[]> {
        const filter = await this.filterStore.getFilter();

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

type ParsedData = string[];

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

function includedInBlocks(character: Pick<ParsedCharacter, "codepoint">, includedBlocks: CodepointInterval[]): boolean {
    return includedBlocks.some(
        (block) => codepointIn(character.codepoint, block)
    );
}

function categoryIncluded(character: Pick<ParsedCharacter, "category">, includedCategories: CharacterCategoryType[]): boolean {
    return includedCategories.some(
        (category) => character.category === category
    );
}

function intoUnicodeCodepoint(char: ParsedCharacter): UnicodeCodepoint {
    return {
        codepoint: String.fromCodePoint(char.codepoint),
        name: char.name.toLowerCase(),
        category: char.category
    };
}
