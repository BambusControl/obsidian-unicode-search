import {
    type MaybeSearchMatchAttributes,
    NONE_RESULT,
    type SearchMatchAttributes
} from "../../unicode-search/components/characterSearch";

export function fillNullSearchMatchScores(match: MaybeSearchMatchAttributes): SearchMatchAttributes {
    return {
        name: match.name ?? NONE_RESULT,
        codePoint: match.codePoint ?? NONE_RESULT
    }
}
