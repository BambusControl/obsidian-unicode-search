import {expect, test} from "@jest/globals";
import {fillNullCharacterMatchScores} from "src/libraries/comparison/fillNullCharacterMatchScores";
import {NONE_RESULT} from "src/unicode-search/components/characterSearch";

test(
    "fills null match attributes while preserving character",
    () => {
        const input = {
            character: { id: 0x41, glyph: "A", name: "LATIN CAPITAL LETTER A", category: "Lu" },
            match: { codePoint: null, name: { score: -0.5, matches: [] } }
        };

        const result = fillNullCharacterMatchScores(input);

        expect(result.character).toEqual(input.character);
        expect(result.match.codePoint).toBe(NONE_RESULT);
        expect(result.match.name).toEqual({ score: -0.5, matches: [] });
    }
)

test(
    "fills all null match attributes",
    () => {
        const input = {
            character: { id: 0x42, glyph: "B", name: "LATIN CAPITAL LETTER B", category: "Lu" },
            match: { codePoint: null, name: null }
        };

        const result = fillNullCharacterMatchScores(input);

        expect(result.character).toEqual(input.character);
        expect(result.match.codePoint).toBe(NONE_RESULT);
        expect(result.match.name).toBe(NONE_RESULT);
    }
)

test(
    "preserves non-null match attributes",
    () => {
        const input = {
            character: { id: 0x43, glyph: "C", name: "LATIN CAPITAL LETTER C", category: "Lu" },
            match: {
                codePoint: { score: -0.2, matches: [] },
                name: { score: -0.3, matches: [] }
            }
        };

        const result = fillNullCharacterMatchScores(input);

        expect(result.character).toEqual(input.character);
        expect(result.match.codePoint).toEqual({ score: -0.2, matches: [] });
        expect(result.match.name).toEqual({ score: -0.3, matches: [] });
    }
)
