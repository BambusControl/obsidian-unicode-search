import { codepointIn } from "src/libraries/helpers/codePointIn";
import { CodepointLiteral } from "src/libraries/types/codepoint/unicode";
import { CodepointInterval } from "src/libraries/types/codepoint/codepointInterval";

describe("codepointIn", () => {
    it("should return true when the codepoint is within the interval", () => {
        const codepoint: CodepointLiteral = 65; // 'A'
        const interval: CodepointInterval = { start: 60, end: 70 };
        expect(codepointIn(codepoint, interval)).toBe(true);
    });

    it("should return false when the codepoint is less than the interval start", () => {
        const codepoint: CodepointLiteral = 50;
        const interval: CodepointInterval = { start: 60, end: 70 };
        expect(codepointIn(codepoint, interval)).toBe(false);
    });

    it("should return false when the codepoint is greater than the interval end", () => {
        const codepoint: CodepointLiteral = 80;
        const interval: CodepointInterval = { start: 60, end: 70 };
        expect(codepointIn(codepoint, interval)).toBe(false);
    });

    it("should return true when the codepoint is equal to the interval start", () => {
        const codepoint: CodepointLiteral = 60;
        const interval: CodepointInterval = { start: 60, end: 70 };
        expect(codepointIn(codepoint, interval)).toBe(true);
    });

    it("should return true when the codepoint is equal to the interval end", () => {
        const codepoint: CodepointLiteral = 70;
        const interval: CodepointInterval = { start: 60, end: 70 };
        expect(codepointIn(codepoint, interval)).toBe(true);
    });
});
