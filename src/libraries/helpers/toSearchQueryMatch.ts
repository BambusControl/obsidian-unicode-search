import {prepareFuzzySearch, prepareSimpleSearch} from "obsidian";
import {MaybeCharacterWithUseHistory} from "../types/codePoint/character";
import {MaybeMetaCharacterSearchResult} from "../../unicode-search/components/characterSearch";
import {toHexadecimal} from "./toHexadecimal";

export function toSearchQueryMatch(query: string) {
    const isHexSafe = query.length <= 4 && !query.contains(" ");

    const codePointSearch = isHexSafe ? prepareSimpleSearch(query) : ((_: string) => null);
    const fuzzyNameSearch = prepareFuzzySearch(query);

    return (character: MaybeCharacterWithUseHistory): MaybeMetaCharacterSearchResult => ({
        character: character,
        match: {
            codePoint: codePointSearch(toHexadecimal(character)),
            name: fuzzyNameSearch(character.name)
        }
    });
}
