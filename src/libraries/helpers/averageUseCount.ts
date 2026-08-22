import {UseCount} from "../types/savedata/useRecord";

export function averageUseCount(items: UseCount[]): number {
    const result = items.reduce(
        (acc, item) => ({
            totalUses: acc.totalUses + item.timesUsed,
            itemCount: acc.itemCount + 1
        }),
        {totalUses: 0, itemCount: 0}
    );

    const {totalUses, itemCount} = result;
    return itemCount === 0 ? 0 : totalUses / itemCount;
}
