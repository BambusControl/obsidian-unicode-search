import {SearchResult} from "obsidian";
import {Character} from "../../libraries/types/codepoint/character";

export type CharacterSearch<T> = {
    item: Character & T,
    match: CharacterSearchMatch,
}

export type CharacterMaybeMatch<T> = {
    item: Character & T,
    match: CharacterSearchMaybeMatch,
}

export type CharacterSearchMatch = {
    codepoint: SearchResult,
    name: SearchResult,
}

export type CharacterSearchMaybeMatch = {
    codepoint: SearchResult | null | undefined,
    name: SearchResult | null | undefined,
}

export const NONE_RESULT: SearchResult = {
    score: 0,
    matches: []
}
