import {DEFAULT_RECENT_CHARACTER_COUNT} from "../../unicode-search/config/default";

import {UsageDate} from "../types/savedata/usageData";
import {compareDates} from "../comparison/compareDates";

export function mostRecentUses(
    items: UsageDate[],
    count: number = DEFAULT_RECENT_CHARACTER_COUNT,
): Array<Date> {
    return items.slice()
        .map(value => value.lastUsed)
        .sort(compareDates)
        .slice(0, count)
    ;
}
