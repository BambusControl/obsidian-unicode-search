import {codePointIn} from "src/libraries/helpers/codePointIn";
import {CodePoint} from "src/libraries/types/codePoint/unicode";
import {CodePointInterval} from "src/libraries/types/codePoint/codePointInterval";

describe("codePointIn", () => {
    it("should return true when the codePoint is within the interval", () => {
        const codePoint: CodePoint = 65; // 'A'
        const interval: CodePointInterval = {start: 60, end: 70};
        expect(codePointIn(codePoint, interval)).toBe(true);
    });

    it("should return false when the codePoint is less than the interval start", () => {
        const codePoint: CodePoint = 50;
        const interval: CodePointInterval = {start: 60, end: 70};
        expect(codePointIn(codePoint, interval)).toBe(false);
    });

    it("should return false when the codePoint is greater than the interval end", () => {
        const codePoint: CodePoint = 80;
        const interval: CodePointInterval = {start: 60, end: 70};
        expect(codePointIn(codePoint, interval)).toBe(false);
    });

    it("should return true when the codePoint is equal to the interval start", () => {
        const codePoint: CodePoint = 60;
        const interval: CodePointInterval = {start: 60, end: 70};
        expect(codePointIn(codePoint, interval)).toBe(true);
    });

    it("should return true when the codePoint is equal to the interval end", () => {
        const codePoint: CodePoint = 70;
        const interval: CodePointInterval = {start: 60, end: 70};
        expect(codePointIn(codePoint, interval)).toBe(true);
    });
});
