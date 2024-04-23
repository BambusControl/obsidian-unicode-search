import {UsageInfo} from "../types/usageInfo";
import {inverse} from "../order/inverse";
import {compareDates, compareNumbers} from "../comparison/compareNumbers";
import {DEFAULT_RECENT_CHARACTER_COUNT} from "../../unicode-search/config/default";
import {QUsageInfo} from "../types/qUsageInfo";

export function qMostRecentlyUsed<T extends QUsageInfo>(
    items: T[],
    count: number = DEFAULT_RECENT_CHARACTER_COUNT,
): Array<T> {
    return items.slice()
        .sort((a, b) => inverse(compareDates(new Date(a.lastUsed), new Date(b.lastUsed))))
        .slice(0, count)
    ;
}
