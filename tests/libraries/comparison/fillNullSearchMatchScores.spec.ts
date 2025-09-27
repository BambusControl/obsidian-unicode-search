import {expect, test} from "@jest/globals";
import {fillNullSearchMatchScores} from "src/libraries/comparison/fillNullSearchMatchScores";
import {NONE_RESULT} from "src/unicode-search/components/characterSearch";

test(
    "fills null codepoint with NONE_RESULT",
    () => {
        const input = {
            codepoint: null,
            name: { score: -0.5, matches: [] }
        };

        const result = fillNullSearchMatchScores(input);

        expect(result.codepoint).toBe(NONE_RESULT);
        expect(result.name).toEqual({ score: -0.5, matches: [] });
    }
)

test(
    "fills null name with NONE_RESULT",
    () => {
        const input = {
            codepoint: { score: -0.5, matches: [] },
            name: null
        };

        const result = fillNullSearchMatchScores(input);

        expect(result.codepoint).toEqual({ score: -0.5, matches: [] });
        expect(result.name).toBe(NONE_RESULT);
    }
)

test(
    "fills both null values with NONE_RESULT",
    () => {
        const input = {
            codepoint: null,
            name: null
        };

        const result = fillNullSearchMatchScores(input);

        expect(result.codepoint).toBe(NONE_RESULT);
        expect(result.name).toBe(NONE_RESULT);
    }
)

test(
    "preserves non-null values",
    () => {
        const input = {
            codepoint: { score: -0.2, matches: [] },
            name: { score: -0.3, matches: [] }
        };

        const result = fillNullSearchMatchScores(input);

        expect(result.codepoint).toEqual({ score: -0.2, matches: [] });
        expect(result.name).toEqual({ score: -0.3, matches: [] });
    }
)
