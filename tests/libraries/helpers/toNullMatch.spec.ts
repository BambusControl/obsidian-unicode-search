import { toNullMatch } from "src/libraries/helpers/toNullMatch";
import { MaybeUsedCharacter, Character } from "src/libraries/types/codepoint/character";

describe("toNullMatch", () => {
    it("should convert character to MaybeMetaCharacterSearchResult with null matches", () => {
        const character: Character = {
            codepoint: "A",
            name: "LATIN CAPITAL LETTER A",
            category: "Lu"
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codepoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle character with usage information", () => {
        const character: MaybeUsedCharacter = {
            codepoint: "A",
            name: "LATIN CAPITAL LETTER A",
            category: "Lu",
            useCount: 5,
            firstUsed: new Date("2023-01-01"),
            lastUsed: new Date("2023-01-02")
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codepoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle basic character without usage info", () => {
        const character: Character = {
            codepoint: "€",
            name: "EURO SIGN",
            category: "Sc"
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codepoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle character with zero usage", () => {
        const character: MaybeUsedCharacter = {
            codepoint: "B",
            name: "LATIN CAPITAL LETTER B",
            category: "Lu",
            useCount: 0,
            firstUsed: new Date("2023-01-01"),
            lastUsed: new Date("2023-01-01")
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codepoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle character with high usage", () => {
        const character: MaybeUsedCharacter = {
            codepoint: "C",
            name: "LATIN CAPITAL LETTER C",
            category: "Lu",
            useCount: 100,
            firstUsed: new Date("2023-01-01"),
            lastUsed: new Date("2023-01-02")
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codepoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle special characters", () => {
        const character: Character = {
            codepoint: "🚀",
            name: "ROCKET",
            category: "So"
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codepoint).toBeNull();
        expect(result.match.name).toBeNull();
    });

    it("should handle characters with empty names", () => {
        const character: Character = {
            codepoint: " ",
            name: "SPACE",
            category: "Zs"
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codepoint).toBeNull();
        expect(result.match.name).toBeNull();
    });
});
