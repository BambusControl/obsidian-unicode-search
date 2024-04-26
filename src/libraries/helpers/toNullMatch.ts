import {MaybeUsedCharacter} from "../types/codepoint/character";
import {MaybeUsedCharacterMatch} from "../../unicode-search/components/characterSearch";

export function toNullMatch(character: MaybeUsedCharacter): MaybeUsedCharacterMatch {
    return {
        item: character,
        match: {
            codepoint: null,
            name: null
        }
    };
}
