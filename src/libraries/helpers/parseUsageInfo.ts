import {UsageInfo} from "../types/savedata/usageInfo";
import {ParsedUsageInfo} from "../types/savedata/parsedUsageInfo";

export function parseUsageInfo<T>(value: T & UsageInfo): T & ParsedUsageInfo {
    return {
        ...value,
        lastUsed: new Date(value.lastUsed),
        firstUsed: new Date(value.firstUsed),
    }
}
