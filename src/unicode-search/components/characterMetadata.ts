import {SearchResult} from "obsidian";
import {Character} from "../../libraries/types/character";

export type CharacterMatch = {
    item: Character,
    match: {
        codepoint: SearchResult,
        name: SearchResult,
    },
}

export const NONE_RESULT: SearchResult = {
    score: 0,
    matches: []
}
