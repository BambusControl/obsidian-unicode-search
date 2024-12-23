import {compareUsedCharacters} from "../../../src/libraries/comparison/compareUsedCharacters";

test(
    "character with `use` is before character without",
    () => {
        expect(compareUsedCharacters(
            {
                codepoint: " ",
                name: "b",
                category: "Ll",
				lastUsed: new Date(2),
                firstUsed: new Date(1),
				useCount: 1
            },
            {
                codepoint: " ",
                name: "a",
                category: "Ll",
            },
            new Date(0),
        )).toBe(-1)
    }
)

test(
    "characters with same `name`, `use`, and `favorite` are equal",
    () => {
        expect(compareUsedCharacters(
            {
                codepoint: " ",
                name: "name",
                category: "Ll",
				firstUsed: new Date(1),
				lastUsed: new Date(1),
				useCount: 1,
            },
            {
                codepoint: " ",
                name: "name",
                category: "Ll",
				firstUsed: new Date(1),
				lastUsed: new Date(1),
				useCount: 1
            },
            new Date(0)
        )).toBe(0)
    }
)
