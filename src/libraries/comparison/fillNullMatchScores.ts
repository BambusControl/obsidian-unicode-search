import {CharacterSearchMatch, CharacterSearchMaybeMatch, NONE_RESULT} from "../../unicode-search/components/characterSearch";

export function fillNullMatchScores(match: CharacterSearchMaybeMatch): CharacterSearchMatch {
    return {
        name: match.name ?? NONE_RESULT,
        codepoint: match.codepoint ?? NONE_RESULT
    }
}
