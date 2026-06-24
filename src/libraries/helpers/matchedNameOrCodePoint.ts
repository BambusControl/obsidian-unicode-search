import {
    MaybeMetaCharacterSearchResult,
    MetaCharacterSearchResult
} from "../../unicode-search/components/characterSearch";

export function matchedNameOrCodePoint(match: MetaCharacterSearchResult | MaybeMetaCharacterSearchResult) {
    return match.match.name != null || match.match.codePoint != null;
}
