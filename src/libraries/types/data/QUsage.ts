import {QUsageData} from "./QUsageData";

export interface QUsage {
    initialized: boolean;
    codepoints: Array<QUsageData>
}
