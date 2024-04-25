import {CharacterMatch, CharacterMaybeMatch} from "../../unicode-search/components/characterMatch";
import {fillNullMatchScores} from "./fillNullMatchScores";

export function fillNullCharacterMatchScores(characterMatch: CharacterMaybeMatch): CharacterMatch {
    return {
        ...characterMatch,
        match: fillNullMatchScores(characterMatch.match),
    };
}
