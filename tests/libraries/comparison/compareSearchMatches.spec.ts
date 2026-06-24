import {expect, test} from "@jest/globals";
import {compareSearchMatches} from "src/libraries/comparison/compareSearchMatches";
import {Order} from "src/libraries/order/order";

test(
    "both null matches are equal",
    () => {
        const nullMatch1 = { codePoint: null, name: null };
        const nullMatch2 = { codePoint: null, name: null };

        expect(compareSearchMatches(nullMatch1, nullMatch2)).toBe(Order.Equal);
    }
)

test(
    "non-null match is before null match",
    () => {
        const realMatch = {
            codePoint: { score: 0, matches: [] },
            name: { score: 0, matches: [] }
        };
        const nullMatch = { codePoint: null, name: null };

        expect(compareSearchMatches(realMatch, nullMatch)).toBe(Order.Before);
    }
)

test(
    "null match is after non-null match",
    () => {
        const nullMatch = { codePoint: null, name: null };
        const realMatch = {
            codePoint: { score: 0, matches: [] },
            name: { score: 0, matches: [] }
        };

        expect(compareSearchMatches(nullMatch, realMatch)).toBe(Order.After);
    }
)

test(
    "better score is before worse score",
    () => {
        const betterMatch = {
            codePoint: { score: 0, matches: [] },
            name: { score: 0, matches: [] }
        };
        const worseMatch = {
            codePoint: { score: -0.5, matches: [] },
            name: { score: -0.5, matches: [] }
        };

        expect(compareSearchMatches(betterMatch, worseMatch)).toBe(Order.Before);
    }
)
