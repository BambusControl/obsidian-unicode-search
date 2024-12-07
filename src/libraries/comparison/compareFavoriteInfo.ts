import {ParsedFavoriteInfo} from "../types/savedata/parsedFavoriteInfo";
import {Order} from "../order/order";
import {compareNullable} from "./compareNullable";
import {inverse} from "../order/inverse";
import {compareDates} from "./compareDates";
import {compareNumbers} from "./compareNumbers";

export function compareFavoriteInfo(
    left: ParsedFavoriteInfo,
    right: ParsedFavoriteInfo,
): Order {
    // We want the most recently added to be first.
    return inverse(compareDates(left.added, right.added));
}
