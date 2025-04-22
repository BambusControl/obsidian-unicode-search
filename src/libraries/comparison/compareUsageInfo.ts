import {Order} from "../order/order";
import {inverse} from "../order/inverse";
import {compareNumbers} from "./compareNumbers";

import {compareDates} from "./compareDates";
import {compareNullable} from "./compareNullable";


import {ParsedUsageInfo} from "../types/savedata/usageInfo";

export function compareUsageInfo(
    left: ParsedUsageInfo,
    right: ParsedUsageInfo,
    recencyCutoff: Date,
): Order {
    // We want the most recently used to be first.
    const lastUsedComparison = compareNullable(
        left.lastUsed < recencyCutoff ? null : left.lastUsed,
        right.lastUsed < recencyCutoff ? null : right.lastUsed,
        (l, r) => inverse(compareDates(l, r))
    );

    if (lastUsedComparison !== Order.Equal) {
        return lastUsedComparison;
    }

	// We want the most used to be before the less used.
	return inverse(compareNumbers(left.useCount, right.useCount));
}
