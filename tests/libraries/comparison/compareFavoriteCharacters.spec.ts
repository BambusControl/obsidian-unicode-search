import {compareFavoriteCharacters} from "../../../src/libraries/comparison/compareFavoriteCharacters";

test(
    "character which is `favorite` is before character which is not",
    () => {
        expect(compareFavoriteCharacters(
            {
                codepoint: " ",
                name: "favorite",
                category: "Ll",
                added: new Date(1),
                hotkey: false,
            },
            {
                codepoint: " ",
                name: "not-favorite",
                category: "Ll",
            },
        )).toBe(-1)
    }
)
