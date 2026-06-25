/**
 * Re-export façade. Canonical definitions live in libraries/types/characterSearch.ts.
 * Plugin-layer code imports from here; libraries/ code imports from the canonical location.
 */
export type {
	CharacterSearchAttributes,
	CharacterSearchResult,
	MaybeMetaCharacterSearchResult,
	MaybeSearchMatchAttributes,
	MetaCharacterSearchResult,
	SearchMatchAttributes,
	SearchMatchResult,
} from "../../libraries/types/characterSearch";
export { NONE_RESULT } from "../../libraries/types/characterSearch";
