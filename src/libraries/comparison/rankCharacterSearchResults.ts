import type {
	MaybeMetaCharacterSearchResult,
	MetaCharacterSearchResult,
	MaybeSearchMatchAttributes,
	SearchMatchAttributes,
} from "../../unicode-search/components/characterSearch";
import { NONE_RESULT } from "../../unicode-search/components/characterSearch";
import type {
	CharacterForSearch,
	CharacterWithUseHistory,
	FavoriteCharacter,
	MaybeCharacterWithUseHistory,
} from "../types/codePoint/character";
import type { Character } from "../types/codePoint/unicode";
import type { ParsedFavorite } from "../types/savedata/favorite";
import { Order } from "../order/order";
import { inverse } from "../order/inverse";
import { compareNullable } from "./compareNullable";
import { compareNumbers } from "./compareNumbers";
import { compareDates } from "./compareDates";
import { compareUseRecord } from "./compareUseRecord";
import { isCharacterWithUseHistory } from "../helpers/isCharacterWithUseHistory";
import { isFavoriteCharacter } from "../helpers/isFavoriteCharacter";

/**
 * Rank character search results by match quality, then use history, then
 * favourite status, then code point order. Fills null match scores with
 * NONE_RESULT so the output is ready to render.
 */
export function rankCharacterSearchResults(
	results: MaybeMetaCharacterSearchResult[],
	recencyCutoff: Date,
): MetaCharacterSearchResult[] {
	return results
		.sort((l, r) => compareCharacterMatches(l, r, recencyCutoff))
		.map(fillNullCharacterMatchScores);
}

// ─── private implementation ───────────────────────────────────────────────

function fillNullCharacterMatchScores(
	result: MaybeMetaCharacterSearchResult,
): MetaCharacterSearchResult {
	return {
		...result,
		match: fillNullSearchMatchScores(result.match),
	};
}

function fillNullSearchMatchScores(
	match: MaybeSearchMatchAttributes,
): SearchMatchAttributes {
	return {
		name: match.name ?? NONE_RESULT,
		codePoint: match.codePoint ?? NONE_RESULT,
	};
}

function compareCharacterMatches(
	left: MaybeMetaCharacterSearchResult,
	right: MaybeMetaCharacterSearchResult,
	recencyCutoff: Date,
): Order {
	const matchComparison = compareSearchMatches(left.match, right.match);
	if (matchComparison !== Order.Equal) return matchComparison;
	return compareCharacters(left.character, right.character, recencyCutoff);
}

function compareSearchMatches(
	left: MaybeSearchMatchAttributes,
	right: MaybeSearchMatchAttributes,
): Order {
	const leftNull = left.codePoint == null && left.name == null;
	const rightNull = right.codePoint == null && right.name == null;

	return compareNullable(
		leftNull ? null : fillNullSearchMatchScores(left),
		rightNull ? null : fillNullSearchMatchScores(right),
		(l, r) => compareSearchMatchScores(l, r),
	);
}

function compareSearchMatchScores(
	left: SearchMatchAttributes,
	right: SearchMatchAttributes,
): Order {
	const codePointScore = right.codePoint.score - left.codePoint.score;
	const nameScore = right.name.score - left.name.score;
	const value = codePointScore + nameScore;
	const nValue = value / Math.abs(value);
	return nValue as Order;
}

function compareCharacters(
	left: CharacterForSearch,
	right: CharacterForSearch,
	recencyCutoff: Date,
): Order {
	const usedComparison = compareCharacterWithUseHistory(
		left,
		right,
		recencyCutoff,
	);
	if (usedComparison !== Order.Equal) return usedComparison;

	const favoriteComparison = compareFavoriteCharacters(left, right);
	if (favoriteComparison !== Order.Equal) return favoriteComparison;

	return compareCodePoints(left, right);
}

function compareCharacterWithUseHistory(
	left: MaybeCharacterWithUseHistory,
	right: MaybeCharacterWithUseHistory,
	recencyCutoff: Date,
): Order {
	return compareNullable(
		toCharacterWithUseHistory(left),
		toCharacterWithUseHistory(right),
		(l, r) => compareUseRecord(l, r, recencyCutoff),
	);
}

function compareFavoriteCharacters(
	left: CharacterForSearch,
	right: CharacterForSearch,
): Order {
	return compareNullable(
		toFavoriteCharacter(left),
		toFavoriteCharacter(right),
		(l, r) => compareFavorite(l, r),
	);
}

function compareFavorite(left: ParsedFavorite, right: ParsedFavorite): Order {
	return inverse(compareDates(left.added, right.added));
}

function compareCodePoints(left: Character, right: Character): Order {
	return compareNumbers(left.id, right.id);
}

function toCharacterWithUseHistory(
	character: MaybeCharacterWithUseHistory,
): CharacterWithUseHistory | null {
	return isCharacterWithUseHistory(character) ? character : null;
}

function toFavoriteCharacter(
	character: CharacterForSearch,
): FavoriteCharacter | null {
	return isFavoriteCharacter(character) ? character : null;
}
