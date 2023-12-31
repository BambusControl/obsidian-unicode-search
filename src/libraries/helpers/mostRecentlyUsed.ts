import {UsageInfo} from "../types/usageInfo";
import {inverse} from "../order/inverse";
import {compareNumbers} from "../comparison/compareNumbers";
import {DEFAULT_RECENT_CHARACTER_COUNT} from "../../unicode-search/config/default";

export function mostRecentlyUsed<T extends UsageInfo>(
    items: T[],
    count: number = DEFAULT_RECENT_CHARACTER_COUNT,
): Array<T> {
    return items.slice()
        .sort((a, b) => inverse(compareNumbers(a.lastUsed, b.lastUsed)))
        .slice(0, count)
    ;
}
