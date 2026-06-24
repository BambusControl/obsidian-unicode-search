import {expect, test} from "@jest/globals";
import {compareCharacters} from "src/libraries/comparison/compareCharacters";
import {Order} from "src/libraries/order/order";

test(
    "used character is before unused character",
    () => {
        const usedChar = {
            id: 0x41,
            glyph: "A",
            name: "LATIN CAPITAL LETTER A",
            category: "Lu",
            timesUsed: 1,
            firstUse: new Date(0),
            lastUse: new Date(1)
        };
        const unusedChar = { id: 0x42, glyph: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" };

        expect(compareCharacters(usedChar, unusedChar, new Date(0))).toBe(Order.Before);
    }
)

test(
    "unused character is after used character",
    () => {
        const unusedChar = { id: 0x42, glyph: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" };
        const usedChar = {
            id: 0x41,
            glyph: "A",
            name: "LATIN CAPITAL LETTER A",
            category: "Lu",
            timesUsed: 1,
            firstUse: new Date(0),
            lastUse: new Date(1)
        };

        expect(compareCharacters(unusedChar, usedChar, new Date(0))).toBe(Order.After);
    }
)

test(
    "favorite character is before non-favorite when usage is equal",
    () => {
        const favoriteChar = {
            id: 0x41,
            glyph: "A",
            name: "LATIN CAPITAL LETTER A",
            category: "Lu",
            added: new Date(0),
            quickInsertEnabled: false
        };
        const normalChar = { id: 0x42, glyph: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" };

        expect(compareCharacters(favoriteChar, normalChar, new Date(0))).toBe(Order.Before);
    }
)

test(
    "earlier id is before later id when all else equal",
    () => {
        const charA = { id: 0x41, glyph: "A", name: "LATIN CAPITAL LETTER A", category: "Lu" };
        const charB = { id: 0x42, glyph: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" };

        expect(compareCharacters(charA, charB, new Date(0))).toBe(Order.Before);
    }
)
