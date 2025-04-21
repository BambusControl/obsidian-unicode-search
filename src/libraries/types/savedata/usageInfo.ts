export type DateString = string;

/**
 * Raw usage information, as stored in save data.
 */
export interface UsageInfo {
    firstUsed: DateString;
    lastUsed: DateString;
    useCount: number;
}
