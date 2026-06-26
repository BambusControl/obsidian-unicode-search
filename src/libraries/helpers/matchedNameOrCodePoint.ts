import type {MaybeMetaCharacterSearchResult, MetaCharacterSearchResult,} from "../types/characterSearch";

export function matchedNameOrCodePoint(
    match: MetaCharacterSearchResult | MaybeMetaCharacterSearchResult,
) {
    return match.match.name != null || match.match.codePoint != null;
}
