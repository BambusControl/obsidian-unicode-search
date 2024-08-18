import {CharacterSearchResult, CharacterSearchMaybeMatch} from "../../unicode-search/components/characterSearch";
import {fillNullMatchScores} from "./fillNullMatchScores";

export function fillNullCharacterMatchScores<T>(characterMatch: CharacterSearchMaybeMatch<T>): CharacterSearchResult<T> {
    return {
        ...characterMatch,
        match: fillNullMatchScores(characterMatch.match),
    };
}
