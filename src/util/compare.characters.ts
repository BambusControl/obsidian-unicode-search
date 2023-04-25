import {Character} from "../data/unicode.character";
import {Order} from "../data/order";
import {StatTracked} from "../data/stat-tracked";
import {comparePinnableCharacters} from "./compare-pinnable.characters";
import {compareNullable} from "./compare.nullable";
import {compareStatTrackedCharacters} from "./compare-stat-tracked.characters";
import {compareUnicodeCharacters} from "./compare-unicode.characters";

export function compareCharacters(left: Character, right: Character): Order {
	let order = comparePinnableCharacters(left, right);

	if (order != Order.Equal) {
		return order;
	}

	order = compareNullable(
		left as StatTracked,
		right as StatTracked,
		(l, r) => compareStatTrackedCharacters(l, r),
	);

	if (order != Order.Equal) {
		return order;
	}

	return compareUnicodeCharacters(left, right);
}
