import {intervalsEqual} from "../../../src/libraries/helpers/intervalsEqual";
import {CodepointInterval} from "../../../src/libraries/types/codepoint/codepointInterval";

describe("intervalsEqual", () => {
    it("should return true for intervals with the same start and end", () => {
        const interval1: CodepointInterval = { start: 10, end: 20 };
        const interval2: CodepointInterval = { start: 10, end: 20 };

        expect(intervalsEqual(interval1, interval2)).toBe(true);
    });

    it("should return false for intervals with different start values", () => {
        const interval1: CodepointInterval = { start: 10, end: 20 };
        const interval2: CodepointInterval = { start: 15, end: 20 };

        expect(intervalsEqual(interval1, interval2)).toBe(false);
    });

    it("should return false for intervals with different end values", () => {
        const interval1: CodepointInterval = { start: 10, end: 20 };
        const interval2: CodepointInterval = { start: 10, end: 25 };

        expect(intervalsEqual(interval1, interval2)).toBe(false);
    });

    it("should return false for completely different intervals", () => {
        const interval1: CodepointInterval = { start: 5, end: 15 };
        const interval2: CodepointInterval = { start: 10, end: 20 };

        expect(intervalsEqual(interval1, interval2)).toBe(false);
    });

    it("should return true for intervals with identical start and end values even if they are zero", () => {
        const interval1: CodepointInterval = { start: 0, end: 0 };
        const interval2: CodepointInterval = { start: 0, end: 0 };

        expect(intervalsEqual(interval1, interval2)).toBe(true);
    });
});
