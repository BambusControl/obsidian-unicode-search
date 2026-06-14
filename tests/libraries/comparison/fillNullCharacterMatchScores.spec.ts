import {expect, test} from "@jest/globals";
import {fillNullCharacterMatchScores} from "src/libraries/comparison/fillNullCharacterMatchScores";
import {NONE_RESULT} from "src/unicode-search/components/characterSearch";

test(
    "fills null match attributes while preserving character",
    () => {
        const input = {
            character: { literal: "A", id: 0x41, name: "LATIN CAPITAL LETTER A", category: "Lu" },
            match: { codepoint: null, name: { score: -0.5, matches: [] } }
        };

        const result = fillNullCharacterMatchScores(input);

        expect(result.character).toEqual(input.character);
        expect(result.match.codepoint).toBe(NONE_RESULT);
        expect(result.match.name).toEqual({ score: -0.5, matches: [] });
    }
)

test(
    "fills all null match attributes",
    () => {
        const input = {
            character: { literal: "B", id: 0x42, name: "LATIN CAPITAL LETTER B", category: "Lu" },
            match: { codepoint: null, name: null }
        };

        const result = fillNullCharacterMatchScores(input);

        expect(result.character).toEqual(input.character);
        expect(result.match.codepoint).toBe(NONE_RESULT);
        expect(result.match.name).toBe(NONE_RESULT);
    }
)

test(
    "preserves non-null match attributes",
    () => {
        const input = {
            character: { literal: "C", id: 0x43, name: "LATIN CAPITAL LETTER C", category: "Lu" },
            match: {
                codepoint: { score: -0.2, matches: [] },
                name: { score: -0.3, matches: [] }
            }
        };

        const result = fillNullCharacterMatchScores(input);

        expect(result.character).toEqual(input.character);
        expect(result.match.codepoint).toEqual({ score: -0.2, matches: [] });
        expect(result.match.name).toEqual({ score: -0.3, matches: [] });
    }
)
