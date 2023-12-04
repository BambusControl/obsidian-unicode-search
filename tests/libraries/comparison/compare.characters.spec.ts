import {compareCharacters} from "../../../src/libraries/comparison/compareCharacters";

test(
    "character with name `a` is before character with name `b`",
    () => {
        expect(compareCharacters(
            {
                char: " ",
                name: "a"
            },
            {
                char: " ",
                name: "b"
            }
        )).toBe(-1)
    }
)

test(
    "character with `use` is before character without",
    () => {
        expect(compareCharacters(
            {
                char: " ",
                name: "b",
				lastUsed: 1,
				useCount: 1
            },
            {
                char: " ",
                name: "a",
            }
        )).toBe(-1)
    }
)

test(
    "characters with same `name` and `use` are equal",
    () => {
        expect(compareCharacters(
            {
                char: " ",
                name: "name",
				lastUsed: 1,
				useCount: 1
            },
            {
                char: " ",
                name: "name",
				lastUsed: 1,
				useCount: 1
            }
        )).toBe(0)
    }
)
