import {expect, test} from "@jest/globals";
import {fillNullSearchMatchScores} from "src/libraries/comparison/fillNullSearchMatchScores";
import {NONE_RESULT} from "src/unicode-search/components/characterSearch";

test(
    "fills null codePoint with NONE_RESULT",
    () => {
        const input = {
            codePoint: null,
            name: { score: -0.5, matches: [] }
        };

        const result = fillNullSearchMatchScores(input);

        expect(result.codePoint).toBe(NONE_RESULT);
        expect(result.name).toEqual({ score: -0.5, matches: [] });
    }
)

test(
    "fills null name with NONE_RESULT",
    () => {
        const input = {
            codePoint: { score: -0.5, matches: [] },
            name: null
        };

        const result = fillNullSearchMatchScores(input);

        expect(result.codePoint).toEqual({ score: -0.5, matches: [] });
        expect(result.name).toBe(NONE_RESULT);
    }
)

test(
    "fills both null values with NONE_RESULT",
    () => {
        const input = {
            codePoint: null,
            name: null
        };

        const result = fillNullSearchMatchScores(input);

        expect(result.codePoint).toBe(NONE_RESULT);
        expect(result.name).toBe(NONE_RESULT);
    }
)

test(
    "preserves non-null values",
    () => {
        const input = {
            codePoint: { score: -0.2, matches: [] },
            name: { score: -0.3, matches: [] }
        };

        const result = fillNullSearchMatchScores(input);

        expect(result.codePoint).toEqual({ score: -0.2, matches: [] });
        expect(result.name).toEqual({ score: -0.3, matches: [] });
    }
)
