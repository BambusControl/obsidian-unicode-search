import {UsageInfo} from "../types/usageInfo";
import {QUsageInfo} from "../types/qUsageInfo";

export function qAverageUseCount(items: QUsageInfo[]): number {
    const result = items.reduce(
        (acc, item) => ({
            totalUses: acc.totalUses + item.useCount,
            itemCount: acc.itemCount + 1
        }),
        {totalUses: 0, itemCount: 0}
    );

    const {totalUses, itemCount} = result;
    return itemCount === 0 ? 0 : totalUses / itemCount;
}
