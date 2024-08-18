import {MaybeMetaCharacterSearchResult} from "../../unicode-search/components/characterSearch";
import {Order} from "../order/order";
import {compareMaybeMatches} from "./compareMaybeMatches";
import {compareUsedCharacters} from "./compareUsedCharacters";

export function compareCharacterMatches(
    left: MaybeMetaCharacterSearchResult,
    right: MaybeMetaCharacterSearchResult,
    recencyCutoff: Date,
): Order {
    const matchComparison = compareMaybeMatches(left.match, right.match);

    if (matchComparison === Order.Equal) {
        return compareUsedCharacters(left.character, right.character, recencyCutoff);
    }

    return matchComparison;
}
