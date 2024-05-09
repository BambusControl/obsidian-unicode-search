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
