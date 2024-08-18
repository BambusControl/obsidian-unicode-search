import {SearchResult} from "obsidian";
import {Character, MetadataCharacter} from "../../libraries/types/codepoint/character";
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

export type MetaCharacterSearchResult = CharacterSearchResult<MetadataCharacter, SearchMatchResult>;
export type MaybeMetaCharacterSearchResult = CharacterSearchResult<MetadataCharacter, Maybe<SearchMatchResult>>;
