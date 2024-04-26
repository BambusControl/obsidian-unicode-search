import {ParsedUsageInfo, UsageInfo} from "../types/savedata/usageData";

export function serializeUsageInfo<T>(value: T & ParsedUsageInfo): T & UsageInfo {
    return {
        ...value,
        lastUsed: value.lastUsed.toJSON(),
        firstUsed: value.firstUsed.toJSON(),
    }
}
