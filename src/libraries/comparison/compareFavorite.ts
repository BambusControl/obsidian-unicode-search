import type { Order } from "../order/order";
import { inverse } from "../order/inverse";
import { compareDates } from "./compareDates";
import type { ParsedFavorite } from "../types/savedata/favorite";

export function compareFavorite(
	left: ParsedFavorite,
	right: ParsedFavorite,
): Order {
	// We want the most recently added to be first.
	return inverse(compareDates(left.added, right.added));
}
