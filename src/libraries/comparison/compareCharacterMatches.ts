import {CharacterMaybeMatch} from "../../unicode-search/components/characterMatch";
import {Order} from "../order/order";
import {compareMaybeMatches} from "./compareMaybeMatches";
import {compareUsedCharacters} from "./compareUsedCharacters";

export function compareCharacterMatches(left: CharacterMaybeMatch, right: CharacterMaybeMatch): Order {
    const matchComparison = compareMaybeMatches(left.match, right.match);

    if (matchComparison === Order.Equal) {
        return compareUsedCharacters(left.item, right.item);
    }

    return matchComparison;
}
