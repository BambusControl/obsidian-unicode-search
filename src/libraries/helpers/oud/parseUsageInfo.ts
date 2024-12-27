import {UsageInfo} from "../../types/savedata/oud/usageInfo";
import {ParsedUsageInfo} from "../../types/savedata/oud/parsedUsageInfo";

export function parseUsageInfo<T>(value: T & UsageInfo): T & ParsedUsageInfo {
    return {
        ...value,
        lastUsed: new Date(value.lastUsed),
        firstUsed: new Date(value.firstUsed),
    }
}
