import {CodepointKey} from "../codepoint/codepointKey";

export interface UsageData {
    initialized: boolean;
    codepoints: Array<CodepointUsage>
}

export type CodepointUsage = CodepointKey & UsageInfo
export type CodepointParsedUsage = CodepointKey & ParsedUsageInfo

export type DateString = string;

export interface UsageInfo {
    firstUsed: DateString;
    lastUsed: DateString;
    useCount: number;
}

export type ParsedUsageInfo = UsageCount & UsageDate;

export interface UsageCount {
    useCount: number;
}

export interface UsageDate {
    firstUsed: Date;
    lastUsed: Date;
}
