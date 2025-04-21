import {compareDates} from "../comparison/compareDates";
import {inverse} from "../order/inverse";

import {UsageDate} from "../types/savedata/parsedUsageInfo";

export function mostRecentUses(items: UsageDate[]): Array<Date> {
    return items.slice()
        .map(value => value.lastUsed)
        .sort((l, r) => inverse(compareDates(l, r)));
}
