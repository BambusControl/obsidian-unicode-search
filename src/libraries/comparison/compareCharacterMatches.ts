import {MaybeMetaCharacterSearchResult} from "../../unicode-search/components/characterSearch";
import {Order} from "../order/order";
import {compareSearchMatches} from "./compareSearchMatches";
import {compareCharacters} from "./compareCharacters";

export function compareCharacterMatches(
    left: MaybeMetaCharacterSearchResult,
    right: MaybeMetaCharacterSearchResult,
    recencyCutoff: Date,
): Order {
    const matchComparison = compareSearchMatches(left.match, right.match);

    if (matchComparison !== Order.Equal) {
        return matchComparison;
    }

    return compareCharacters(left.character, right.character, recencyCutoff);
}

