import {UsageData} from "./QUsageData";

export interface Usage {
    initialized: boolean;
    codepoints: Array<UsageData>
}
