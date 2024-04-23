import {SearchResult} from "obsidian";
import {QCharacter} from "../../libraries/types/qCharacter";

export type QCharacterMatch = {
    item: QCharacter,
    match: {
        codepoint: SearchResult,
        name: SearchResult,
    },
}

export const NONE_RESULT: SearchResult = {
    score: 0,
    matches: []
}
