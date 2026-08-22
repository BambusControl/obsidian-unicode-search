import {prepareFuzzySearch, prepareSimpleSearch} from "obsidian";
import type {MaybeCharacterWithUseHistory} from "../../libraries/types/codePoint/character";
import type {MaybeMetaCharacterSearchResult, MetaCharacterSearchResult,} from "../../libraries/types/characterSearch";
import {toHexadecimal} from "../../libraries/helpers/toHexadecimal";
import {toNullMatch} from "../../libraries/helpers/toNullMatch";
import {matchedNameOrCodePoint} from "../../libraries/helpers/matchedNameOrCodePoint";
import {rankCharacterSearchResults} from "../../libraries/comparison/rankCharacterSearchResults";

/**
 * The full fuzzy search pipeline: query routing, candidate retrieval,
 * scoring, and ranking. Returns a sorted, render-ready result list.
 *
 * Extracted from FuzzySearchModal so the pipeline can be tested without
 * an Obsidian App instance. See ADR-0010.
 */
export function searchCharacters(
    query: string,
    characters: MaybeCharacterWithUseHistory[],
    recencyCutoff: Date,
): MetaCharacterSearchResult[] {
    const queryEmpty = query == null || query.length < 1;

    const prepared: MaybeMetaCharacterSearchResult[] = queryEmpty
        ? characters.map(toNullMatch)
        : characters.map(toSearchMatch(query)).filter(matchedNameOrCodePoint);

    return rankCharacterSearchResults(prepared, recencyCutoff);
}

function toSearchMatch(
    query: string,
): (character: MaybeCharacterWithUseHistory) => MaybeMetaCharacterSearchResult {
    const isHexSafe = query.length <= 4 && !query.includes(" ");
    const codePointSearch = isHexSafe
        ? prepareSimpleSearch(query)
        : (_: string) => null;
    const fuzzyNameSearch = prepareFuzzySearch(query);

    return (character) => ({
        character,
        match: {
            codePoint: codePointSearch(toHexadecimal(character)),
            name: fuzzyNameSearch(character.name),
        },
    });
}
