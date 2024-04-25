import {Match, MaybeMatch, NONE_RESULT} from "../../unicode-search/components/characterMatch";

export function fillNullMatchScores(match: MaybeMatch): Match {
    return {
        name: match.name ?? NONE_RESULT,
        codepoint: match.codepoint ?? NONE_RESULT
    }
}
