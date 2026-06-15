import { parseFavoriteInfo } from "src/libraries/helpers/parseFavoriteInfo";
import { FavoriteInfo } from "src/libraries/types/savedata/favoriteInfo";

describe("parseFavoriteInfo", () => {
    it("should parse raw favorite info with date string to Date object", () => {
        const rawFavoriteInfo: FavoriteInfo = {
            added: "2023-01-01T10:00:00.000Z",
            hotkey: true,
        };

        const result = parseFavoriteInfo(rawFavoriteInfo);

        expect(result.added).toEqual(new Date("2023-01-01T10:00:00.000Z"));
        expect(result.hotkey).toBe(true);
    });

    it("should preserve additional properties from the input object", () => {
        const rawFavoriteInfoWithExtra = {
            added: "2023-01-01T10:00:00.000Z",
            hotkey: false,
            extraProperty: "test",
            anotherProp: 42,
        };

        const result = parseFavoriteInfo(rawFavoriteInfoWithExtra);

        expect(result.added).toEqual(new Date("2023-01-01T10:00:00.000Z"));
        expect(result.hotkey).toBe(false);
        expect(result.extraProperty).toBe("test");
        expect(result.anotherProp).toBe(42);
    });

    it("should handle ISO date strings without milliseconds", () => {
        const rawFavoriteInfo: FavoriteInfo = {
            added: "2023-01-01T10:00:00Z",
            hotkey: false,
        };

        const result = parseFavoriteInfo(rawFavoriteInfo);

        expect(result.added).toEqual(new Date("2023-01-01T10:00:00Z"));
    });

    it("should handle dates with timezone offsets", () => {
        const rawFavoriteInfo: FavoriteInfo = {
            added: "2023-01-01T10:00:00+02:00",
            hotkey: true,
        };

        const result = parseFavoriteInfo(rawFavoriteInfo);

        expect(result.added).toEqual(new Date("2023-01-01T10:00:00+02:00"));
    });
});
