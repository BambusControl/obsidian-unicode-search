import {expect, test} from "@jest/globals";
import {compareSearchMatchScores} from "src/libraries/comparison/compareSearchMatchScores";
import {Order} from "src/libraries/order/order";

test(
    "better combined score is before worse combined score",
    () => {
        const betterMatch = {
            codepoint: { score: 0, matches: [] },
            name: { score: 0, matches: [] }
        };
        const worseMatch = {
            codepoint: { score: -0.5, matches: [] },
            name: { score: -0.5, matches: [] }
        };

        expect(compareSearchMatchScores(betterMatch, worseMatch)).toBe(Order.Before);
    }
)

test(
    "worse combined score is after better combined score",
    () => {
        const worseMatch = {
            codepoint: { score: -0.5, matches: [] },
            name: { score: -0.5, matches: [] }
        };
        const betterMatch = {
            codepoint: { score: 0, matches: [] },
            name: { score: 0, matches: [] }
        };

        expect(compareSearchMatchScores(worseMatch, betterMatch)).toBe(Order.After);
    }
)

test(
    "truly equal combined scores return NaN (which is handled by caller)",
    () => {
        const match1 = {
            codepoint: { score: -0.2, matches: [] },
            name: { score: -0.3, matches: [] }
        };
        const match2 = {
            codepoint: { score: -0.2, matches: [] },
            name: { score: -0.3, matches: [] }
        };

        // When scores are exactly equal, division by 0 results in NaN
        expect(isNaN(compareSearchMatchScores(match1, match2))).toBe(true);
    }
)
