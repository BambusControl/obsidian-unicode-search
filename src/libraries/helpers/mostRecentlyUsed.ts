import {inverse} from "../order/inverse";
import {compareDates} from "../comparison/compareNumbers";
import {DEFAULT_RECENT_CHARACTER_COUNT} from "../../unicode-search/config/default";

import {UsageInfo} from "../types/savedata/usageData";

export function mostRecentlyUsed<T extends UsageInfo>(
    items: T[],
    count: number = DEFAULT_RECENT_CHARACTER_COUNT,
): Array<T> {
    return items.slice()
        .sort((a, b) => inverse(compareDates(new Date(a.lastUsed), new Date(b.lastUsed))))
        .slice(0, count)
    ;
}
