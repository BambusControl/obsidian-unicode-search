import {UsageInfo, RawUsageInfo} from "../types/savedata/usageInfo";

export function serializeUsageInfo<T>(value: T & UsageInfo): T & RawUsageInfo {
    return {
        ...value,
        lastUsed: value.lastUsed.toJSON(),
        firstUsed: value.firstUsed.toJSON(),
    }
}
