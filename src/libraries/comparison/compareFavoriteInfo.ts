import {Order} from "../order/order";
import {inverse} from "../order/inverse";
import {compareDates} from "./compareDates";
import {ParsedFavoriteInfo} from "../types/savedata/favoriteInfo";

export function compareFavoriteInfo(
    left: ParsedFavoriteInfo,
    right: ParsedFavoriteInfo,
): Order {
    // We want the most recently added to be first.
    return inverse(compareDates(left.added, right.added));
}
