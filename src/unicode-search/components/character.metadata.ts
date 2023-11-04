import {Character} from "../../libraries/types/unicode.character";
import {SearchResult} from "obsidian";

export type Timestamp = number;

export type CharacterMatch = {
    item: Character,
    // match: Record<keyof Character, SearchResult>;
    match: {
        codepoint: SearchResult,
        name: SearchResult,
    },
}

export const NONE_RESULT: SearchResult = {
    score: 0,
    matches: []
}
