import {CodepointInterval} from "../../../src/libraries/types/codepoint/codepointInterval";
import {mergeIntervals} from "../../../src/libraries/helpers/mergeIntervals";

describe("mergeIntervals", () => {
    it("should merge overlapping intervals", () => {
        const input: CodepointInterval[] = [
            { start: 1, end: 3 },
            { start: 2, end: 6 },
            { start: 8, end: 10 },
            { start: 15, end: 18 },
        ];
        const expected: CodepointInterval[] = [
            { start: 1, end: 6 },
            { start: 8, end: 10 },
            { start: 15, end: 18 },
        ];
        expect(mergeIntervals(input)).toEqual(expected);
    });

    it("should handle non-overlapping intervals", () => {
        const input: CodepointInterval[] = [
            { start: 1, end: 2 },
            { start: 3, end: 4 },
            { start: 5, end: 6 },
        ];
        const expected: CodepointInterval[] = [
            { start: 1, end: 2 },
            { start: 3, end: 4 },
            { start: 5, end: 6 },
        ];
        expect(mergeIntervals(input)).toEqual(expected);
    });

    it("should handle a single interval", () => {
        const input: CodepointInterval[] = [{ start: 1, end: 5 }];
        const expected: CodepointInterval[] = [{ start: 1, end: 5 }];
        expect(mergeIntervals(input)).toEqual(expected);
    });

    it("should handle an empty array", () => {
        const input: CodepointInterval[] = [];
        const expected: CodepointInterval[] = [];
        expect(mergeIntervals(input)).toEqual(expected);
    });

    it("should handle intervals that are already merged", () => {
        const input: CodepointInterval[] = [
            { start: 1, end: 5 },
            { start: 6, end: 10 },
        ];
        const expected: CodepointInterval[] = [
            { start: 1, end: 5 },
            { start: 6, end: 10 },
        ];
        expect(mergeIntervals(input)).toEqual(expected);
    });

    it("should handle intervals with the same start and end", () => {
        const input: CodepointInterval[] = [
            { start: 1, end: 3 },
            { start: 1, end: 3 },
        ];
        const expected: CodepointInterval[] = [{ start: 1, end: 3 }];
        expect(mergeIntervals(input)).toEqual(expected);
    });

    it("should handle unsorted intervals", () => {
        const input: CodepointInterval[] = [
            { start: 8, end: 10 },
            { start: 1, end: 3 },
            { start: 2, end: 6 },
            { start: 15, end: 18 },
        ];
        const expected: CodepointInterval[] = [
            { start: 1, end: 6 },
            { start: 8, end: 10 },
            { start: 15, end: 18 },
        ];
        expect(mergeIntervals(input)).toEqual(expected);
    });
});
