import {serializeFavorite} from "src/libraries/helpers/serializeFavorite";
import {type ParsedFavorite,} from "src/libraries/types/savedata/favorite";

describe("serializeFavorite", () => {
    it("should serialize favorite info with Date object to date string", () => {
        const favorite: ParsedFavorite = {
            added: new Date("2023-01-01T10:00:00.000Z"),
            quickInsertEnabled: true,
        };

        const result = serializeFavorite(favorite);

        expect(result.added).toBe("2023-01-01T10:00:00.000Z");
        expect(result.quickInsertEnabled).toBe(true);
    });

    it("should preserve additional properties from the input object", () => {
        const favoriteWithExtra = {
            added: new Date("2023-01-01T10:00:00.000Z"),
            quickInsertEnabled: false,
            extraProperty: "test",
            anotherProp: 42,
        };

        const result = serializeFavorite(favoriteWithExtra);

        expect(result.added).toBe("2023-01-01T10:00:00.000Z");
        expect(result.quickInsertEnabled).toBe(false);
        expect(result.extraProperty).toBe("test");
        expect(result.anotherProp).toBe(42);
    });

    it("should handle dates with different timezones correctly", () => {
        const favorite: ParsedFavorite = {
            added: new Date("2023-01-01T10:00:00+02:00"),
            quickInsertEnabled: true,
        };

        const result = serializeFavorite(favorite);

        // Date should be serialized to ISO string in UTC
        expect(result.added).toBe(new Date("2023-01-01T10:00:00+02:00").toJSON());
    });

    it("should handle quickInsertEnabled false", () => {
        const favorite: ParsedFavorite = {
            added: new Date("2023-01-01T10:00:00.000Z"),
            quickInsertEnabled: false,
        };

        const result = serializeFavorite(favorite);

        expect(result.quickInsertEnabled).toBe(false);
        expect(result.added).toBe("2023-01-01T10:00:00.000Z");
    });

    it("should handle quickInsertEnabled true", () => {
        const favorite: ParsedFavorite = {
            added: new Date("2023-01-01T10:00:00.000Z"),
            quickInsertEnabled: true,
        };

        const result = serializeFavorite(favorite);

        expect(result.quickInsertEnabled).toBe(true);
        expect(result.added).toBe("2023-01-01T10:00:00.000Z");
    });

    it("should serialize type correctly", () => {
        const favorite: ParsedFavorite = {
            added: new Date("2023-01-01T10:00:00.000Z"),
            quickInsertEnabled: true,
        };

        const result = serializeFavorite(favorite);

        // Verify serialized format
        expect(typeof result.added).toBe("string");
        expect(typeof result.quickInsertEnabled).toBe("boolean");
    });
});
