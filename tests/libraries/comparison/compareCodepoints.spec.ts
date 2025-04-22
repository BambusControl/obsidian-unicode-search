import {compareCodepoints} from "../../../src/libraries/comparison/compareCodepoints";

test(
    "character with codepoint `a` is before character with codepoint `b`",
    () => {
        expect(compareCodepoints(
            {
                codepoint: "a",
                name: "",
                category: "Ll",
            },
            {
                codepoint: "b",
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
                codepoint: "b",
                name: "",
                category: "Ll",
            },
            {
                codepoint: "a",
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
                codepoint: "a",
                name: "",
                category: "Ll",
            },
            {
                codepoint: "a",
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
                codepoint: "A",
                name: "",
                category: "Lu",
            },
            {
                codepoint: "a",
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
                codepoint: "z",
                name: "",
                category: "Ll",
            },
            {
                codepoint: "y",
                name: "",
                category: "Ll",
            },
        )).toBe(1);
    }
);
