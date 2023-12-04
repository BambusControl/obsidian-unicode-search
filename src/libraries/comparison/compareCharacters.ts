import {Order} from "../order/order";
import {UsageInfo} from "../types/usageInfo";
import {compareNullable} from "./compareNullable";
import {compareUsageTrackedCharacters} from "./compareUsageTrackedCharacters";
import {compareUnicodeNames} from "./compareUnicodeNames";
import {Character} from "../types/character";

export function compareCharacters(left: Character, right: Character): Order {
	const order = compareNullable(
		left as UsageInfo,
		right as UsageInfo,
		(l, r) => compareUsageTrackedCharacters(l, r),
	);

	if (order != Order.Equal) {
		return order;
	}

	return compareUnicodeNames(left, right);
}
