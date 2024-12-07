import {
    MaybeMetaCharacterSearchResult,
    MetaCharacterSearchResult
} from "../../unicode-search/components/characterSearch";
import {fillNullSearchMatchScores} from "./fillNullSearchMatchScores";

export function fillNullCharacterMatchScores(characterMatch: MaybeMetaCharacterSearchResult): MetaCharacterSearchResult {
    return {
        ...characterMatch,
        match: fillNullSearchMatchScores(characterMatch.match),
    };
}
