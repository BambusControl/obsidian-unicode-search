import {compareDates} from "../comparison/compareDates";
import {inverse} from "../order/inverse";


import {UsageDate} from "../types/savedata/usageInfo";

export function mostRecentUses(items: UsageDate[]): Date[] {
    return items.slice()
        .map(value => value.lastUsed)
        .sort((l, r) => inverse(compareDates(l, r)));
}
