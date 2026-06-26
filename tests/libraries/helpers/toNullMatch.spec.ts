import {toNullMatch} from "src/libraries/helpers/toNullMatch";
import type {Character, MaybeCharacterWithUseHistory} from "src/libraries/types/codePoint/character";

describe("toNullMatch", () => {
    it("should convert character to MaybeMetaCharacterSearchResult with null matches", () => {
        const character: Character = {
            id: 0x41,
            glyph: "A",
            name: "LATIN CAPITAL LETTER A",
            category: "Lu"
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codePoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle character with usage information", () => {
        const character: MaybeCharacterWithUseHistory = {
            id: 0x41,
            glyph: "A",
            name: "LATIN CAPITAL LETTER A",
            category: "Lu",
            timesUsed: 5,
            firstUse: new Date("2023-01-01"),
            lastUse: new Date("2023-01-02")
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codePoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle basic character without usage info", () => {
        const character: Character = {
            id: 0x20AC,
            glyph: "€",
            name: "EURO SIGN",
            category: "Sc"
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codePoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle character with zero usage", () => {
        const character: MaybeCharacterWithUseHistory = {
            id: 0x42,
            glyph: "B",
            name: "LATIN CAPITAL LETTER B",
            category: "Lu",
            timesUsed: 0,
            firstUse: new Date("2023-01-01"),
            lastUse: new Date("2023-01-01")
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codePoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle character with high usage", () => {
        const character: MaybeCharacterWithUseHistory = {
            id: 0x43,
            glyph: "C",
            name: "LATIN CAPITAL LETTER C",
            category: "Lu",
            timesUsed: 100,
            firstUse: new Date("2023-01-01"),
            lastUse: new Date("2023-01-02")
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codePoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle special characters", () => {
        const character: Character = {
            id: 0x1F680,
            glyph: "🚀",
            name: "ROCKET",
            category: "So"
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codePoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle characters with empty names", () => {
        const character: Character = {
            id: 0x20,
            glyph: " ",
            name: "SPACE",
            category: "Zs"
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codePoint).toBeNull();
        expect(result.match.name).toBeNull();
    });
});
