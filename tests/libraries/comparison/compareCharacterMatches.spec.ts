import {expect, test} from "@jest/globals";
import {compareCharacterMatches} from "src/libraries/comparison/compareCharacterMatches";
import {Order} from "src/libraries/order/order";

test(
    "better match is before worse match",
    () => {
        const betterMatch = {
            character: { codepoint: "A", name: "LATIN CAPITAL LETTER A", category: "Lu" },
            match: { codepoint: { score: 0, matches: [] }, name: { score: 0, matches: [] } }
        };
        const worseMatch = {
            character: { codepoint: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" },
            match: { codepoint: { score: -0.5, matches: [] }, name: { score: -0.5, matches: [] } }
        };

        expect(compareCharacterMatches(betterMatch, worseMatch, new Date(0))).toBe(Order.Before);
    }
)

test(
    "worse match is after better match",
    () => {
        const worseMatch = {
            character: { codepoint: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" },
            match: { codepoint: { score: -0.5, matches: [] }, name: { score: -0.5, matches: [] } }
        };
        const betterMatch = {
            character: { codepoint: "A", name: "LATIN CAPITAL LETTER A", category: "Lu" },
            match: { codepoint: { score: 0, matches: [] }, name: { score: 0, matches: [] } }
        };

        expect(compareCharacterMatches(worseMatch, betterMatch, new Date(0))).toBe(Order.After);
    }
)

test(
    "different match scores compare correctly",
    () => {
        const matchA = {
            character: { codepoint: "A", name: "LATIN CAPITAL LETTER A", category: "Lu" },
            match: { codepoint: { score: -0.3, matches: [] }, name: { score: -0.5, matches: [] } }
        };
        const matchB = {
            character: { codepoint: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" },
            match: { codepoint: { score: -0.6, matches: [] }, name: { score: -0.4, matches: [] } }
        };

        // matchA total: -0.8, matchB total: -1.0, so matchA should be before matchB (better score)
        expect(compareCharacterMatches(matchA, matchB, new Date(0))).toBe(Order.Before);
    }
)
