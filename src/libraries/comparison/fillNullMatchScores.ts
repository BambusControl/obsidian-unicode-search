import {CharacterMatchResult, CharacterMaybeMatchResult, NONE_RESULT} from "../../unicode-search/components/characterSearch";

export function fillNullMatchScores(match: CharacterMaybeMatchResult): CharacterMatchResult {
    return {
        name: match.name ?? NONE_RESULT,
        codepoint: match.codepoint ?? NONE_RESULT
    }
}
