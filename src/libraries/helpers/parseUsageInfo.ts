import {UsageInfo, RawUsageInfo} from "../types/savedata/usageInfo";

export function parseUsageInfo<T>(value: T & RawUsageInfo): T & UsageInfo {
    return {
        ...value,
        lastUsed: new Date(value.lastUsed),
        firstUsed: new Date(value.firstUsed),
    }
}
