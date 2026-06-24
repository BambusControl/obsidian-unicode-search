export type {Character} from "./unicode";
import type {Character} from "./unicode";

import type {ParsedFavorite} from "../savedata/favorite";
import type {UseRecord} from "../savedata/useRecord";

export type CharacterWithUseHistory = Character & UseRecord;
export type MaybeCharacterWithUseHistory = Character | CharacterWithUseHistory;

export type FavoriteCharacter = Character & ParsedFavorite;
export type MaybeFavoriteCharacter = Character | FavoriteCharacter;

/**
 * Character with attached metadata for use throughout the plugin
 */
export type CharacterForSearch = Character | CharacterWithUseHistory | FavoriteCharacter;

export type CharacterKey = Character["id"];
