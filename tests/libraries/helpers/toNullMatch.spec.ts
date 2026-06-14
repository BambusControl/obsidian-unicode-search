import { toNullMatch } from "src/libraries/helpers/toNullMatch";
import { MaybeUsedCharacter, Character } from "src/libraries/types/codepoint/character";

describe("toNullMatch", () => {
    it("should convert character to MaybeMetaCharacterSearchResult with null matches", () => {
        const character: Character = {
            literal: "A",
            id: 0x41,
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
            literal: "A",
            id: 0x41,
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
            literal: "€",
            id: 0x20ac,
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
            literal: "B",
            id: 0x42,
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
            literal: "C",
            id: 0x43,
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
            literal: "🚀",
            id: 0x1f680,
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
            literal: " ",
            id: 0x20,
            name: "SPACE",
            category: "Zs"
        };

        const result = toNullMatch(character);

        expect(result.character).toBe(character);
        expect(result.match.codepoint).toBeNull();
        expect(result.match.name).toBeNull();
    });
});
