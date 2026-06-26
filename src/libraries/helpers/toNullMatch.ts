import type {MaybeCharacterWithUseHistory} from "../types/codePoint/character";
import type {MaybeMetaCharacterSearchResult} from "../types/characterSearch";

export function toNullMatch(
    character: MaybeCharacterWithUseHistory,
): MaybeMetaCharacterSearchResult {
    return {
        character: character,
        match: {
            codePoint: null,
            name: null,
        },
    };
}
