import {compareFavoriteCharacters} from "src/libraries/comparison/compareFavoriteCharacters";

test(
    "character which is `favorite` is before character which is not",
    () => {
        expect(compareFavoriteCharacters(
            {
                literal: " ",
                id: 0x20,
                name: "favorite",
                category: "Ll",
                added: new Date(1),
                hotkey: false,
            },
            {
                literal: " ",
                id: 0x20,
                name: "not-favorite",
                category: "Ll",
            },
        )).toBe(-1)
    }
)
