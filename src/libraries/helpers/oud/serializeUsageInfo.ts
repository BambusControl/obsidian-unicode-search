import {UsageInfo} from "../../types/savedata/oud/usageInfo";
import {ParsedUsageInfo} from "../../types/savedata/oud/parsedUsageInfo";

export function serializeUsageInfo<T>(value: T & ParsedUsageInfo): T & UsageInfo {
    return {
        ...value,
        lastUsed: value.lastUsed.toJSON(),
        firstUsed: value.firstUsed.toJSON(),
    }
}
