import {expect, test} from "@jest/globals";
import {compareSearchMatches} from "src/libraries/comparison/compareSearchMatches";
import {Order} from "src/libraries/order/order";

test(
    "both null matches are equal",
    () => {
        const nullMatch1 = { codepoint: null, name: null };
        const nullMatch2 = { codepoint: null, name: null };

        expect(compareSearchMatches(nullMatch1, nullMatch2)).toBe(Order.Equal);
    }
)

test(
    "non-null match is before null match",
    () => {
        const realMatch = {
            codepoint: { score: 0, matches: [] },
            name: { score: 0, matches: [] }
        };
        const nullMatch = { codepoint: null, name: null };

        expect(compareSearchMatches(realMatch, nullMatch)).toBe(Order.Before);
    }
)

test(
    "null match is after non-null match",
    () => {
        const nullMatch = { codepoint: null, name: null };
        const realMatch = {
            codepoint: { score: 0, matches: [] },
            name: { score: 0, matches: [] }
        };

        expect(compareSearchMatches(nullMatch, realMatch)).toBe(Order.After);
    }
)

test(
    "better score is before worse score",
    () => {
        const betterMatch = {
            codepoint: { score: 0, matches: [] },
            name: { score: 0, matches: [] }
        };
        const worseMatch = {
            codepoint: { score: -0.5, matches: [] },
            name: { score: -0.5, matches: [] }
        };

        expect(compareSearchMatches(betterMatch, worseMatch)).toBe(Order.Before);
    }
)
