export type DateString = string;

/**
 * Raw usage information, as stored in save data.
 */
export interface UsageInfo {
    firstUsed: DateString;
    lastUsed: DateString;
    useCount: number;
}

/**
 * Parsed usage information, ready for use.
 */
export type ParsedUsageInfo = UsageCount & UsageDate;

export interface UsageCount {
    useCount: number;
}

export interface UsageDate {
    firstUsed: Date;
    lastUsed: Date;
}
