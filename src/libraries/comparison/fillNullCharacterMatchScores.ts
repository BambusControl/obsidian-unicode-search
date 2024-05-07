import {CharacterSearch, CharacterMaybeMatch} from "../../unicode-search/components/characterSearch";
import {fillNullMatchScores} from "./fillNullMatchScores";

export function fillNullCharacterMatchScores<T>(characterMatch: CharacterMaybeMatch<T>): CharacterSearch<T> {
    return {
        ...characterMatch,
        match: fillNullMatchScores(characterMatch.match),
    };
}
