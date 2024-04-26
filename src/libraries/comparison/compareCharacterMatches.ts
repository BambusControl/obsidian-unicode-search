import {CharacterMaybeMatch} from "../../unicode-search/components/characterSearch";
import {Order} from "../order/order";
import {compareMaybeMatches} from "./compareMaybeMatches";
import {compareUsedCharacters} from "./compareUsedCharacters";

export function compareCharacterMatches<T>(
    left: CharacterMaybeMatch<T>,
    right: CharacterMaybeMatch<T>,
    recencyCutoff: Date,
): Order {
    const matchComparison = compareMaybeMatches(left.match, right.match);

    if (matchComparison === Order.Equal) {
        return compareUsedCharacters(left.item, right.item, recencyCutoff);
    }

    return matchComparison;
}
