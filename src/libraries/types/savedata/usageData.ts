import {CodepointKey} from "../codepoint/codepointKey";

export interface UsageData {
    initialized: boolean;
    codepoints: Array<CodepointUsage>
}

export type CodepointUsage = CodepointKey & UsageInfo

export interface UsageInfo {
    firstUsed: string;
    lastUsed: string;
    useCount: number;
}
