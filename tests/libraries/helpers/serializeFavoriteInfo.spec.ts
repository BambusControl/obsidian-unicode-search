import { serializeFavoriteInfo } from "src/libraries/helpers/serializeFavoriteInfo";
import { FavoriteInfo, ParsedFavoriteInfo } from "src/libraries/types/savedata/favoriteInfo";

describe("serializeFavoriteInfo", () => {
    it("should serialize favorite info with Date object to date string", () => {
        const favoriteInfo: ParsedFavoriteInfo = {
            added: new Date("2023-01-01T10:00:00.000Z"),
            hotkey: true
        };

        const result = serializeFavoriteInfo(favoriteInfo);

        expect(result.added).toBe("2023-01-01T10:00:00.000Z");
        expect(result.hotkey).toBe(true);
    });

    it("should preserve additional properties from the input object", () => {
        const favoriteInfoWithExtra = {
            added: new Date("2023-01-01T10:00:00.000Z"),
            hotkey: false,
            extraProperty: "test",
            anotherProp: 42
        };

        const result = serializeFavoriteInfo(favoriteInfoWithExtra);

        expect(result.added).toBe("2023-01-01T10:00:00.000Z");
        expect(result.hotkey).toBe(false);
        expect(result.extraProperty).toBe("test");
        expect(result.anotherProp).toBe(42);
    });

    it("should handle dates with different timezones correctly", () => {
        const favoriteInfo: ParsedFavoriteInfo = {
            added: new Date("2023-01-01T10:00:00+02:00"),
            hotkey: true
        };

        const result = serializeFavoriteInfo(favoriteInfo);

        // Date should be serialized to ISO string in UTC
        expect(result.added).toBe(new Date("2023-01-01T10:00:00+02:00").toJSON());
    });

    it("should handle hotkey false", () => {
        const favoriteInfo: ParsedFavoriteInfo = {
            added: new Date("2023-01-01T10:00:00.000Z"),
            hotkey: false
        };

        const result = serializeFavoriteInfo(favoriteInfo);

        expect(result.hotkey).toBe(false);
        expect(result.added).toBe("2023-01-01T10:00:00.000Z");
    });

    it("should handle hotkey true", () => {
        const favoriteInfo: ParsedFavoriteInfo = {
            added: new Date("2023-01-01T10:00:00.000Z"),
            hotkey: true
        };

        const result = serializeFavoriteInfo(favoriteInfo);

        expect(result.hotkey).toBe(true);
        expect(result.added).toBe("2023-01-01T10:00:00.000Z");
    });

    it("should serialize type correctly", () => {
        const favoriteInfo: ParsedFavoriteInfo = {
            added: new Date("2023-01-01T10:00:00.000Z"),
            hotkey: true
        };

        const result = serializeFavoriteInfo(favoriteInfo);

        // Verify serialized format
        expect(typeof result.added).toBe("string");
        expect(typeof result.hotkey).toBe("boolean");
    });
});
