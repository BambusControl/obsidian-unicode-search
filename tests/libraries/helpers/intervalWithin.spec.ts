import { intervalWithin } from "../../../src/libraries/helpers/intervalWithin";
import { CodepointInterval } from "../../../src/libraries/types/codepoint/codepointInterval";

describe("intervalWithin", () => {
    it("should return true when the inner interval is completely within the outer interval", () => {
        const outer: CodepointInterval = { start: 10, end: 20 };
        const inner: CodepointInterval = { start: 12, end: 18 };
        expect(intervalWithin(outer, inner)).toBe(true);
    });

    it("should return false when the inner interval starts before the outer interval", () => {
        const outer: CodepointInterval = { start: 10, end: 20 };
        const inner: CodepointInterval = { start: 8, end: 18 };
        expect(intervalWithin(outer, inner)).toBe(false);
    });

    it("should return false when the inner interval ends after the outer interval", () => {
        const outer: CodepointInterval = { start: 10, end: 20 };
        const inner: CodepointInterval = { start: 12, end: 22 };
        expect(intervalWithin(outer, inner)).toBe(false);
    });

    it("should return true when the inner interval is exactly the same as the outer interval", () => {
        const outer: CodepointInterval = { start: 10, end: 20 };
        const inner: CodepointInterval = { start: 10, end: 20 };
        expect(intervalWithin(outer, inner)).toBe(true);
    });

    it("should return false when the inner interval is completely outside the outer interval", () => {
        const outer: CodepointInterval = { start: 10, end: 20 };
        const inner: CodepointInterval = { start: 21, end: 30 };
        expect(intervalWithin(outer, inner)).toBe(false);
    });
});
