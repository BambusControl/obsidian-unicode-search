import {Character} from "../types/unicode.character";
import {Order} from "../order/order";
import {UsageInfo} from "../types/usage-info";
import {comparePinnableCharacters} from "./compare-pinnable.characters";
import {compareNullable} from "./compare.nullable";
import {compareStatTrackedCharacters} from "./compare-stat-tracked.characters";
import {compareUnicodeNames} from "./compare-unicode.names";

export function compareCharacters(left: Character, right: Character): Order {
	let order = comparePinnableCharacters(left, right);

	if (order != Order.Equal) {
		return order;
	}

	order = compareNullable(
		left as UsageInfo,
		right as UsageInfo,
		(l, r) => compareStatTrackedCharacters(l, r),
	);

	if (order != Order.Equal) {
		return order;
	}

	return compareUnicodeNames(left, right);
}
