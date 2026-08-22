import {describe, expect, test} from "@jest/globals";
import {searchCharacters} from "src/unicode-search/service/fuzzySearch";
import {NONE_RESULT} from "src/libraries/types/characterSearch";

// ─── fixtures ────────────────────────────────────────────────────────────────

const ZERO_CUTOFF = new Date(0);

function makeChar(id: number, name: string, extra?: Record<string, unknown>) {
    return {
        id,
        glyph: String.fromCodePoint(id),
        name,
        category: "Lu",
        ...extra,
    };
}

const CHAR_A = makeChar(0x41, "latin capital letter a");
const CHAR_B = makeChar(0x42, "latin capital letter b");
const CHAR_STAR = makeChar(0x2605, "black star");

// ─── empty query ──────────────────────────────────────────────────────────────

describe("empty query", () => {
    test("returns all characters", () => {
        const results = searchCharacters("", [CHAR_A, CHAR_B], ZERO_CUTOFF);
        expect(results).toHaveLength(2);
    });

    test("null query returns all characters", () => {
        // getSuggestions can pass null before the user types
        const results = searchCharacters(
            null as unknown as string,
            [CHAR_A, CHAR_B],
            ZERO_CUTOFF,
        );
        expect(results).toHaveLength(2);
    });

    test("fills null scores with NONE_RESULT", () => {
        const [result] = searchCharacters("", [CHAR_A], ZERO_CUTOFF);
        expect(result.match.name).toBe(NONE_RESULT);
        expect(result.match.codePoint).toBe(NONE_RESULT);
    });

    test("returns empty array when character pool is empty", () => {
        expect(searchCharacters("", [], ZERO_CUTOFF)).toHaveLength(0);
    });
});

// ─── name matching ────────────────────────────────────────────────────────────

describe("name matching", () => {
    test("matches characters whose name contains the query", () => {
        const results = searchCharacters("star", [CHAR_A, CHAR_STAR], ZERO_CUTOFF);
        expect(results).toHaveLength(1);
        expect(results[0].character.id).toBe(0x2605);
    });

    test("excludes characters that do not match", () => {
        const results = searchCharacters(
            "xyz",
            [CHAR_A, CHAR_B, CHAR_STAR],
            ZERO_CUTOFF,
        );
        expect(results).toHaveLength(0);
    });

    test("match is case-insensitive", () => {
        const results = searchCharacters("LATIN", [CHAR_A, CHAR_STAR], ZERO_CUTOFF);
        expect(results).toHaveLength(1);
        expect(results[0].character.id).toBe(0x41);
    });
});

// ─── hex code-point matching ──────────────────────────────────────────────────

describe("hex code-point matching", () => {
    test("short query (≤4 chars, no space) matches hex code point", () => {
        // CHAR_A is U+0041; query "0041" should match it
        const results = searchCharacters("0041", [CHAR_A, CHAR_STAR], ZERO_CUTOFF);
        const ids = results.map((r) => r.character.id);
        expect(ids).toContain(0x41);
    });

    test("long query is not used for hex matching", () => {
        // "00412" is 5 chars — hex search skipped, name search finds nothing
        const results = searchCharacters("00412", [CHAR_A], ZERO_CUTOFF);
        expect(results).toHaveLength(0);
    });
});

// ─── ranking ─────────────────────────────────────────────────────────────────

describe("ranking", () => {
    test("better name-match score is ranked first", () => {
        // "a" appears at index 0 in CHAR_A's name, later in CHAR_B's
        const CHAR_ALPHA = makeChar(0x03b1, "alpha");
        const CHAR_BETA = makeChar(0x03b2, "beta");
        const results = searchCharacters("a", [CHAR_BETA, CHAR_ALPHA], ZERO_CUTOFF);
        // "alpha" starts with "a" (score closer to 0); "beta" has "a" later
        expect(results[0].character.id).toBe(0x03b1);
    });

    test("used character ranks before unused when scores are equal", () => {
        const usedChar = makeChar(0x42, "latin capital letter b", {
            timesUsed: 3,
            firstUse: new Date(0),
            lastUse: new Date(1),
        });
        const unusedChar = makeChar(0x41, "latin capital letter a");

        // Empty query → null/null matches → Order.Equal → tiebreaker by use-history
        const results = searchCharacters("", [unusedChar, usedChar], ZERO_CUTOFF);
        expect(results[0].character.id).toBe(usedChar.id);
    });
});

// ─── output contract ─────────────────────────────────────────────────────────

describe("output contract", () => {
    test("all results have non-null match scores", () => {
        const results = searchCharacters("letter", [CHAR_A, CHAR_B], ZERO_CUTOFF);
        for (const r of results) {
            expect(r.match.name).not.toBeNull();
            expect(r.match.codePoint).not.toBeNull();
        }
    });

    test("character data is preserved in results", () => {
        const [result] = searchCharacters("star", [CHAR_STAR], ZERO_CUTOFF);
        expect(result.character.id).toBe(0x2605);
        expect(result.character.name).toBe("black star");
    });
});
