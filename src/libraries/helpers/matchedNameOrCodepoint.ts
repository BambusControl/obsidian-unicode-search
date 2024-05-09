import {MaybeUsedCharacterMatch, UsedCharacterSearch} from "../../unicode-search/components/characterSearch";

export function matchedNameOrCodepoint(match: UsedCharacterSearch | MaybeUsedCharacterMatch) {
    return match.match.name != null || match.match.codepoint != null;
}
