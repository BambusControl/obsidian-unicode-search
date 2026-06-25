import type {
	Character,
	CharacterForSearch,
} from "../types/codePoint/character";
import type { Maybe } from "./maybe";

/**
 * The two axes on which a character is matched during fuzzy search.
 * Parameterised so the same shape works for both nullable (mid-pipeline)
 * and non-nullable (final output) match results.
 */
export type CharacterSearchAttributes<T> = {
	/** Match against the hex code point representation. */
	codePoint: T;
	/** Match against the Unicode character name. */
	name: T;
};

/**
 * A single match score returned by a search strategy.
 * Structurally equivalent to Obsidian's SearchResult — kept here so that
 * libraries/ carries no obsidian import.
 */
export type SearchMatchResult = {
	score: number;
	matches: [number, number][];
};

/** Sentinel used when a search axis produced no match. */
export const NONE_RESULT: SearchMatchResult = { score: 0, matches: [] };

/** Raw search result for one character — typed on the character variant and the match kind. */
export type CharacterSearchResult<CharacterType, MatchType> = {
	character: Character & CharacterType;
	match: CharacterSearchAttributes<MatchType>;
};

/** Fully matched result ready to render. */
export type MetaCharacterSearchResult = CharacterSearchResult<
	CharacterForSearch,
	SearchMatchResult
>;

/** Mid-pipeline result where either axis may not have matched yet. */
export type MaybeMetaCharacterSearchResult = CharacterSearchResult<
	CharacterForSearch,
	Maybe<SearchMatchResult>
>;

/** Match attributes with concrete scores (post-fill). */
export type SearchMatchAttributes =
	CharacterSearchAttributes<SearchMatchResult>;

/** Match attributes where either axis may still be null (pre-fill). */
export type MaybeSearchMatchAttributes = CharacterSearchAttributes<
	Maybe<SearchMatchResult>
>;
