import {MaybeCharacterWithUseHistory} from "../types/codePoint/character";
import {MaybeMetaCharacterSearchResult} from "../../unicode-search/components/characterSearch";

export function toNullMatch(character: MaybeCharacterWithUseHistory): MaybeMetaCharacterSearchResult {
    return {
        character: character,
        match: {
            codePoint: null,
            name: null
        }
    };
}
