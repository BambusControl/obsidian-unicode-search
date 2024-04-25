import {SearchResult} from "obsidian";
import {Character} from "../../libraries/types/codepoint/character";

export type CharacterMatch = {
    item: Character,
    match: Match,
}

export type CharacterMaybeMatch = {
    item: Character,
    match: MaybeMatch,
}

export type Match = {
    codepoint: SearchResult,
    name: SearchResult,
}

export type MaybeMatch = {
    codepoint: SearchResult | null | undefined,
    name: SearchResult | null | undefined,
}

export const NONE_RESULT: SearchResult = {
    score: 0,
    matches: []
}
