/**
 * Minimal obsidian mock for Jest. Provides structural equivalents of the
 * fuzzy-search utilities so tests can exercise searchCharacters without an
 * Obsidian App instance.
 */

type MatchResult = { score: number; matches: [number, number][] };
type SearchFn = (text: string) => MatchResult | null;

/** Simple substring match — used for hex code-point search. */
export function prepareSimpleSearch(query: string): SearchFn {
	const lower = query.toLowerCase();
	return (text: string): MatchResult | null => {
		const idx = text.toLowerCase().indexOf(lower);
		if (idx === -1) return null;
		return { score: 0, matches: [[idx, idx + lower.length]] };
	};
}

/** Fuzzy match — approximates Obsidian's scoring for test purposes. */
export function prepareFuzzySearch(query: string): SearchFn {
	const lower = query.toLowerCase();
	return (text: string): MatchResult | null => {
		const idx = text.toLowerCase().indexOf(lower);
		if (idx === -1) return null;
		// Score: 0 for exact prefix, increasingly negative as match appears later
		const score = -(idx / Math.max(text.length, 1));
		return { score, matches: [[idx, idx + lower.length]] };
	};
}
