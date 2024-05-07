import {CodepointInterval} from "../types/codepoint/codepointInterval";

/**
 * @param codepointIntervals
 * @see https://www.geeksforgeeks.org/merging-intervals/
 */
export function mergeIntervals(codepointIntervals: Array<CodepointInterval>): Array<CodepointInterval> {
    const intervals = Array.from(codepointIntervals);

    /* Sort intervals in increasing order of start time */
    intervals.sort((a, b) => a.start - b.start);

    /* Stores index of last element in output array (modified intervals[]) */
    let p = 0;

    for (let c = 1; c < intervals.length; c++) {
        const previous = intervals[p];
        const current = intervals[c];

        const overlaps = previous.end >= current.start;

        if (overlaps) {
            previous.end = Math.max(previous.end, current.end);
        } else {
            p++;
            intervals[p] = current;
        }
    }

    /* intervals[0 .. p - 1] stores the merged intervals */
    return intervals.slice(0, p + 1);
}
