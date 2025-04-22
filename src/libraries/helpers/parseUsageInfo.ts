import {ParsedUsageInfo, UsageInfo} from "../types/savedata/usageInfo";

export function parseUsageInfo<T>(value: T & UsageInfo): T & ParsedUsageInfo {
    return {
        ...value,
        lastUsed: new Date(value.lastUsed),
        firstUsed: new Date(value.firstUsed),
    }
}
