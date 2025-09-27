import {expect, test} from "@jest/globals";
import {compareCharacters} from "src/libraries/comparison/compareCharacters";
import {Order} from "src/libraries/order/order";

test(
    "used character is before unused character",
    () => {
        const usedChar = {
            codepoint: "A",
            name: "LATIN CAPITAL LETTER A",
            category: "Lu",
            useCount: 1,
            firstUsed: new Date(0),
            lastUsed: new Date(1)
        };
        const unusedChar = { codepoint: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" };

        expect(compareCharacters(usedChar, unusedChar, new Date(0))).toBe(Order.Before);
    }
)

test(
    "unused character is after used character",
    () => {
        const unusedChar = { codepoint: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" };
        const usedChar = {
            codepoint: "A",
            name: "LATIN CAPITAL LETTER A",
            category: "Lu",
            useCount: 1,
            firstUsed: new Date(0),
            lastUsed: new Date(1)
        };

        expect(compareCharacters(unusedChar, usedChar, new Date(0))).toBe(Order.After);
    }
)

test(
    "favorite character is before non-favorite when usage is equal",
    () => {
        const favoriteChar = {
            codepoint: "A",
            name: "LATIN CAPITAL LETTER A",
            category: "Lu",
            isFavorite: true,
            favoriteCreated: new Date(0)
        };
        const normalChar = { codepoint: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" };

        expect(compareCharacters(favoriteChar, normalChar, new Date(0))).toBe(Order.Before);
    }
)

test(
    "earlier codepoint is before later codepoint when all else equal",
    () => {
        const charA = { codepoint: "A", name: "LATIN CAPITAL LETTER A", category: "Lu" };
        const charB = { codepoint: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" };

        expect(compareCharacters(charA, charB, new Date(0))).toBe(Order.Before);
    }
)
