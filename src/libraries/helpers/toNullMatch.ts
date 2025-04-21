import {MaybeUsedCharacter} from "../types/codepoint/character";
import {MaybeMetaCharacterSearchResult} from "../../unicode-search/components/characterSearch";

export function toNullMatch(character: MaybeUsedCharacter): MaybeMetaCharacterSearchResult {
    return {
        character: character,
        match: {
            codepoint: null,
            name: null
        }
    };
}
