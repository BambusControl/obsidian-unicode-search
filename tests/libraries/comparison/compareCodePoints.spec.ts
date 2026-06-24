import {compareCodePoints} from "src/libraries/comparison/compareCodePoints";

test(
    "character with id `a` (0x61) is before character with id `b` (0x62)",
    () => {
        expect(compareCodePoints(
            {
                id: 0x61,
                glyph: "a",
                name: "",
                category: "Ll",
            },
            {
                id: 0x62,
                glyph: "b",
                name: "",
                category: "Ll",
            },
        )).toBe(-1);
    }
);

test(
    "character with id `b` (0x62) is after character with id `a` (0x61)",
    () => {
        expect(compareCodePoints(
            {
                id: 0x62,
                glyph: "b",
                name: "",
                category: "Ll",
            },
            {
                id: 0x61,
                glyph: "a",
                name: "",
                category: "Ll",
            },
        )).toBe(1);
    }
);

test(
    "character with id `a` (0x61) is equal to character with id `a` (0x61)",
    () => {
        expect(compareCodePoints(
            {
                id: 0x61,
                glyph: "a",
                name: "",
                category: "Ll",
            },
            {
                id: 0x61,
                glyph: "a",
                name: "",
                category: "Ll",
            },
        )).toBe(0);
    }
);

test(
    "character with id `A` (0x41) is before character with id `a` (0x61)",
    () => {
        expect(compareCodePoints(
            {
                id: 0x41,
                glyph: "A",
                name: "",
                category: "Lu",
            },
            {
                id: 0x61,
                glyph: "a",
                name: "",
                category: "Ll",
            },
        )).toBe(-1);
    }
);

test(
    "character with id `z` (0x7A) is after character with id `y` (0x79)",
    () => {
        expect(compareCodePoints(
            {
                id: 0x7A,
                glyph: "z",
                name: "",
                category: "Ll",
            },
            {
                id: 0x79,
                glyph: "y",
                name: "",
                category: "Ll",
            },
        )).toBe(1);
    }
);
