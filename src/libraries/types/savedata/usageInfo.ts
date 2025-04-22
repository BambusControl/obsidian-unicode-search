/**
 * Alias to hint that a string is a date string
 * @example "2023-10-01T12:00:00Z"
 */
export type DateString = string;

/**
 * Raw usage information, as stored in save data
 */
export interface RawUsageInfo {
    firstUsed: DateString;
    lastUsed: DateString;
    useCount: number;
}

/**
 * Parsed usage information for use in the plugin
 */
export type UsageInfo = UsageCount & UsageDate;

/**
 * Usage count for statistics
 */
export interface UsageCount {
    useCount: number;
}

/**
 * Usage date for statistics
 */
export interface UsageDate {
    firstUsed: Date;
    lastUsed: Date;
}
