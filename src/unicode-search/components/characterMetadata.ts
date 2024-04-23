import {SearchResult} from "obsidian";
import {Character} from "../../libraries/types/character";
import {QCharacter} from "../../libraries/types/qCharacter";

export type CharacterMatch = {
    item: Character,
    match: {
        codepoint: SearchResult,
        name: SearchResult,
    },
}

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
