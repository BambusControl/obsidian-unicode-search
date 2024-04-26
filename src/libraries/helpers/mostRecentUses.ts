import {UsageDate} from "../types/savedata/usageData";
import {compareDates} from "../comparison/compareDates";
import {inverse} from "../order/inverse";

export function mostRecentUses(
    items: UsageDate[],
    count: number,
): Array<Date> {
    return items.slice()
        .map(value => value.lastUsed)
        .sort((l, r) => inverse(compareDates(l, r)))
        .slice(0, count);
}
