import {MaybeMetaCharacterSearchResult, MetaCharacterSearchResult} from "../../../unicode-search/components/characterSearch";

export function matchedNameOrCodepoint(match: MetaCharacterSearchResult | MaybeMetaCharacterSearchResult) {
    return match.match.name != null || match.match.codepoint != null;
}
