import {prepareFuzzySearch, prepareSimpleSearch} from "obsidian";
import {MaybeUsedCharacter} from "../types/codepoint/character";
import {MaybeUsedCharacterMatch} from "../../unicode-search/components/characterSearch";
import {toHexadecimal} from "./toHexadecimal";

export function toSearchQueryMatch(query: string) {
    const isHexSafe = query.length <= 4 && !query.contains(" ");

    const codepointSearch = isHexSafe ? prepareSimpleSearch(query) : ((text: string) => null);
    const fuzzyNameSearch = prepareFuzzySearch(query);

    return (character: MaybeUsedCharacter): MaybeUsedCharacterMatch => ({
        item: character,
        match: {
            codepoint: codepointSearch(toHexadecimal(character)),
            name: fuzzyNameSearch(character.name)
        }
    });
}
