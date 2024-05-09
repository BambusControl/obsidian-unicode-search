import {UsageInfo} from "../types/savedata/usageInfo";
import {ParsedUsageInfo} from "../types/savedata/parsedUsageInfo";

export function serializeUsageInfo<T>(value: T & ParsedUsageInfo): T & UsageInfo {
    return {
        ...value,
        lastUsed: value.lastUsed.toJSON(),
        firstUsed: value.firstUsed.toJSON(),
    }
}
