import {SearchResult} from "obsidian";
import {Character, CharacterForSearch} from "../../libraries/types/codePoint/character";
import {CharacterSearchAttributes} from "./characterSearchAttributes";
import {Maybe} from "../../libraries/types/maybe";

/**
 * Evaluation of the strength of a match from a search
 */
export type SearchMatchResult = SearchResult;

export const NONE_RESULT: SearchMatchResult = {
    score: 0,
    matches: []
}

/**
 * Search result of a single character match
 */
export type CharacterSearchResult<CharacterType, AttributeMatchType> = {
    character: Character & CharacterType,
    match: CharacterSearchAttributes<AttributeMatchType>,
}

export type MetaCharacterSearchResult = CharacterSearchResult<CharacterForSearch, SearchMatchResult>;
export type MaybeMetaCharacterSearchResult = CharacterSearchResult<CharacterForSearch, Maybe<SearchMatchResult>>;
export type MaybeSearchMatchAttributes = CharacterSearchAttributes<Maybe<SearchMatchResult>>;
export type SearchMatchAttributes = CharacterSearchAttributes<SearchMatchResult>;
