import {Order} from "../order/order";
import {inverse} from "../order/inverse";
import {compareNullable} from "./compareNullable";
import {compareNumbers} from "./compareNumbers";

import {UsageInfo} from "../types/savedata/usageData";
import {compareDates} from "./compareDates";

export function compareUsageTrackedCharacters(left: UsageInfo, right: UsageInfo): Order {
	// We want the most recently used to be first.
	const lastUsedComparison = compareNullable(
		left.lastUsed == null ? null : new Date(left.lastUsed),
		right.lastUsed == null ? null : new Date(right.lastUsed),
		(l, r) => compareDates(l, r),
	);

	if (lastUsedComparison !== Order.Equal) {
		return lastUsedComparison;
	}

	// We want the most used to be before the less used.
	return inverse(compareNumbers(left.useCount, right.useCount));
}
