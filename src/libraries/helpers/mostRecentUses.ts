import {compareDates} from "../comparison/compareDates";
import {inverse} from "../order/inverse";
import {UseDate} from "../types/savedata/useRecord";

export function mostRecentUses(items: UseDate[]): Date[] {
    return items.slice()
        .map(value => value.lastUse)
        .sort((l, r) => inverse(compareDates(l, r)));
}
