import {Order} from "../order/order";
import {inverse} from "../order/inverse";
import {compareNumbers} from "./compareNumbers";

import {compareDates} from "./compareDates";
import {compareNullable} from "./compareNullable";


import {UseRecord} from "../types/savedata/useRecord";

export function compareUseRecord(
    left: UseRecord,
    right: UseRecord,
    recencyCutoff: Date,
): Order {
    // We want the most recently used to be first.
    const lastUseComparison = compareNullable(
        left.lastUse < recencyCutoff ? null : left.lastUse,
        right.lastUse < recencyCutoff ? null : right.lastUse,
        (l, r) => inverse(compareDates(l, r))
    );

    if (lastUseComparison !== Order.Equal) {
        return lastUseComparison;
    }

    // We want the most used to be before the less used.
    return inverse(compareNumbers(left.timesUsed, right.timesUsed));
}
