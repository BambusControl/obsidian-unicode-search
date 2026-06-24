/**
 * Alias to hint that a string is a date string
 * @example "2023-10-01T12:00:00Z"
 */
export type DateString = string;

/**
 * Raw usage information, as stored in save data
 */
export interface RawUseRecord {
    firstUse: DateString;
    lastUse: DateString;
    timesUsed: number;
}

/**
 * Parsed usage information for use in the plugin
 */
export type UseRecord = UseCount & UseDate;

/**
 * Usage count for statistics
 */
export interface UseCount {
    timesUsed: number;
}

/**
 * Usage date for statistics
 */
export interface UseDate {
    firstUse: Date;
    lastUse: Date;
}
