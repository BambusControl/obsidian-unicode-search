import {prepareFuzzySearch, prepareSimpleSearch} from "obsidian";
import {MaybeUsedCharacter} from "../../types/codepoint/character";
import {MaybeMetaCharacterSearchResult} from "../../../unicode-search/components/characterSearch";
import {toHexadecimal} from "./toHexadecimal";

export function toSearchQueryMatch(query: string) {
    const isHexSafe = query.length <= 4 && !query.contains(" ");

    const codepointSearch = isHexSafe ? prepareSimpleSearch(query) : ((text: string) => null);
    const fuzzyNameSearch = prepareFuzzySearch(query);

    return (character: MaybeUsedCharacter): MaybeMetaCharacterSearchResult => ({
        character: character,
        match: {
            codepoint: codepointSearch(toHexadecimal(character)),
            name: fuzzyNameSearch(character.name)
        }
    });
}
