import {Order} from "../order/order";
import {inverse} from "../order/inverse";
import {compareNumbers} from "./compareNumbers";

import {ParsedUsageInfo} from "../types/savedata/usageData";
import {compareDates} from "./compareDates";

export function compareUsageInfo(left: ParsedUsageInfo, right: ParsedUsageInfo): Order {
	if (!(left.lastUsed == null && right.lastUsed == null) && (left.lastUsed == null || right.lastUsed == null)) {
        console.log({
            left,
            right
        })
    }

    // We want the most recently used to be first.
	const lastUsedComparison = inverse(compareDates(left.lastUsed, right.lastUsed));

	if (lastUsedComparison !== Order.Equal) {
		return lastUsedComparison;
	}

	// We want the most used to be before the less used.
	return inverse(compareNumbers(left.useCount, right.useCount));
}
