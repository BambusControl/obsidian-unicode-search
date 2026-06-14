import {compareCodepoints} from "src/libraries/comparison/compareCodepoints";

test(
    "character with codepoint `a` is before character with codepoint `b`",
    () => {
        expect(compareCodepoints(
            {
                literal: "a",
                id: 0x61,
                name: "",
                category: "Ll",
            },
            {
                literal: "b",
                id: 0x62,
                name: "",
                category: "Ll",
            },
        )).toBe(-1);
    }
);

test(
    "character with codepoint `b` is after character with codepoint `a`",
    () => {
        expect(compareCodepoints(
            {
                literal: "b",
                id: 0x62,
                name: "",
                category: "Ll",
            },
            {
                literal: "a",
                id: 0x61,
                name: "",
                category: "Ll",
            },
        )).toBe(1);
    }
);

test(
    "character with codepoint `a` is equal to character with codepoint `a`",
    () => {
        expect(compareCodepoints(
            {
                literal: "a",
                id: 0x61,
                name: "",
                category: "Ll",
            },
            {
                literal: "a",
                id: 0x61,
                name: "",
                category: "Ll",
            },
        )).toBe(0);
    }
);

test(
    "character with codepoint `A` is before character with codepoint `a`",
    () => {
        expect(compareCodepoints(
            {
                literal: "A",
                id: 0x41,
                name: "",
                category: "Lu",
            },
            {
                literal: "a",
                id: 0x61,
                name: "",
                category: "Ll",
            },
        )).toBe(-1);
    }
);

test(
    "character with codepoint `z` is after character with codepoint `y`",
    () => {
        expect(compareCodepoints(
            {
                literal: "z",
                id: 0x7a,
                name: "",
                category: "Ll",
            },
            {
                literal: "y",
                id: 0x79,
                name: "",
                category: "Ll",
            },
        )).toBe(1);
    }
);
