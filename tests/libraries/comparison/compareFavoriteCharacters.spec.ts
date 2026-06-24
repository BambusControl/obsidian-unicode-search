import {compareFavoriteCharacters} from "src/libraries/comparison/compareFavoriteCharacters";

test(
    "character which is `favorite` is before character which is not",
    () => {
        expect(compareFavoriteCharacters(
            {
                id: 0x20,
                glyph: " ",
                name: "favorite",
                category: "Ll",
                added: new Date(1),
                quickInsertEnabled: false,
            },
            {
                id: 0x20,
                glyph: " ",
                name: "not-favorite",
                category: "Ll",
            },
        )).toBe(-1)
    }
)
