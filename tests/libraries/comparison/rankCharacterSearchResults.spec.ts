import { describe, expect, test } from "@jest/globals";
import { rankCharacterSearchResults } from "src/libraries/comparison/rankCharacterSearchResults";
import { NONE_RESULT } from "src/unicode-search/components/characterSearch";

// ─── fixtures ────────────────────────────────────────────────────────────────

const ZERO_CUTOFF = new Date(0);

function makeResult(
	id: number,
	nameScore: number | null,
	codePointScore: number | null,
	extra?: Record<string, unknown>,
) {
	return {
		character: {
			id,
			glyph: String.fromCodePoint(id),
			name: `character ${id}`,
			category: "Lu",
			...extra,
		},
		match: {
			name: nameScore != null ? { score: nameScore, matches: [] } : null,
			codePoint:
				codePointScore != null ? { score: codePointScore, matches: [] } : null,
		},
	};
}

// ─── match score wins ─────────────────────────────────────────────────────────

describe("match score", () => {
	test("better score is ranked first", () => {
		const better = makeResult(0x41, 0, 0);
		const worse = makeResult(0x42, -0.5, -0.5);

		const [first] = rankCharacterSearchResults([worse, better], ZERO_CUTOFF);

		expect(first.character.id).toBe(0x41);
	});

	test("combined score across both axes determines order", () => {
		// matchA total: -0.8, matchB total: -1.0
		const matchA = makeResult(0x41, -0.5, -0.3);
		const matchB = makeResult(0x42, -0.4, -0.6);

		const [first] = rankCharacterSearchResults([matchB, matchA], ZERO_CUTOFF);

		expect(first.character.id).toBe(0x41);
	});

	test("matched result is ranked before null-match result", () => {
		const matched = makeResult(0x42, -0.5, null);
		const nullMatch = makeResult(0x41, null, null);

		const [first] = rankCharacterSearchResults(
			[nullMatch, matched],
			ZERO_CUTOFF,
		);

		expect(first.character.id).toBe(0x42);
	});
});

// ─── use-history tiebreaker ───────────────────────────────────────────────────

describe("use history (scores equal)", () => {
	test("used character is ranked before unused", () => {
		const used = makeResult(0x42, null, null, {
			timesUsed: 1,
			firstUse: new Date(0),
			lastUse: new Date(1),
		});
		const unused = makeResult(0x41, null, null);

		const [first] = rankCharacterSearchResults([unused, used], ZERO_CUTOFF);

		expect(first.character.id).toBe(0x42);
	});
});

// ─── favourite tiebreaker ─────────────────────────────────────────────────────

describe("favourite (scores and usage equal)", () => {
	test("favourite is ranked before non-favourite", () => {
		const favourite = makeResult(0x42, null, null, {
			added: new Date(1),
			quickInsertEnabled: false,
		});
		const nonFavourite = makeResult(0x41, null, null);

		const [first] = rankCharacterSearchResults(
			[nonFavourite, favourite],
			ZERO_CUTOFF,
		);

		expect(first.character.id).toBe(0x42);
	});
});

// ─── code point final tiebreaker ─────────────────────────────────────────────

describe("code point (all else equal)", () => {
	test("lower code point is ranked first", () => {
		const a = makeResult(0x41, null, null);
		const b = makeResult(0x42, null, null);

		const [first] = rankCharacterSearchResults([b, a], ZERO_CUTOFF);

		expect(first.character.id).toBe(0x41);
	});
});

// ─── output contract ─────────────────────────────────────────────────────────

describe("output contract", () => {
	test("null match scores are filled with NONE_RESULT", () => {
		const result = makeResult(0x41, null, null);

		const [ranked] = rankCharacterSearchResults([result], ZERO_CUTOFF);

		expect(ranked.match.name).toBe(NONE_RESULT);
		expect(ranked.match.codePoint).toBe(NONE_RESULT);
	});

	test("non-null match scores are preserved", () => {
		const result = makeResult(0x41, -0.3, -0.5);

		const [ranked] = rankCharacterSearchResults([result], ZERO_CUTOFF);

		expect(ranked.match.name).toEqual({ score: -0.3, matches: [] });
		expect(ranked.match.codePoint).toEqual({ score: -0.5, matches: [] });
	});

	test("mixed null and non-null scores are both filled correctly", () => {
		const result = makeResult(0x41, -0.5, null);

		const [ranked] = rankCharacterSearchResults([result], ZERO_CUTOFF);

		expect(ranked.match.name).toEqual({ score: -0.5, matches: [] });
		expect(ranked.match.codePoint).toBe(NONE_RESULT);
	});
});
