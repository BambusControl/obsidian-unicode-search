import {UsageCount} from "../types/savedata/usageInfo";

export function averageUseCount(items: UsageCount[]): number {
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
