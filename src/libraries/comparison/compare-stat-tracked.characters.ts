import {UsageInfo} from "../types/usage-info";
import {Order} from "../order/order";
import {inverse} from "../order/inverse";
import {compareNullable} from "./compare.nullable";
import {compareNumbers} from "./compare.numbers";

export function compareStatTrackedCharacters(left: UsageInfo, right: UsageInfo): Order {
	// We want the most recently used to be first.
	const lastUsedComparison = compareNullable(
		left.lastUsed,
		right.lastUsed,
		(l, r) => inverse(compareNumbers(l, r)),
	);

	if (lastUsedComparison != Order.Equal) {
		return lastUsedComparison;
	}

	// We want the most used to be before the less used.
	return inverse(compareNumbers(left.useCount, right.useCount));
}
