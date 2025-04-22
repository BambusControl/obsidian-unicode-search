import {
    MaybeSearchMatchAttributes,
    NONE_RESULT,
    SearchMatchAttributes
} from "../../unicode-search/components/characterSearch";

export function fillNullSearchMatchScores(match: MaybeSearchMatchAttributes): SearchMatchAttributes {
    return {
        name: match.name ?? NONE_RESULT,
        codepoint: match.codepoint ?? NONE_RESULT
    }
}
