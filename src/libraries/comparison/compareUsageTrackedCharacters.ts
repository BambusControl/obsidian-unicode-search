import {Order} from "../order/order";
import {inverse} from "../order/inverse";
import {compareNullable} from "./compareNullable";
import {compareNumbers} from "./compareNumbers";

import {ParsedUsageInfo, UsageInfo} from "../types/savedata/usageData";
import {compareDates} from "./compareDates";
import {parseDateString} from "../helpers/parseDateString";
import {compose} from "./compose";

export function compareUsageTrackedCharacters(left: ParsedUsageInfo, right: ParsedUsageInfo): Order {
	// We want the most recently used to be first.
	const lastUsedComparison = compareNullable(
        left.lastUsed,
        right.lastUsed,
		(l, r) => compareDates(l, r),
	);

	if (lastUsedComparison !== Order.Equal) {
		return lastUsedComparison;
	}

	// We want the most used to be before the less used.
	return inverse(compareNumbers(left.useCount, right.useCount));
}
