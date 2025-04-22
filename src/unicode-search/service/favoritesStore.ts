import { CharacterKey } from "../../libraries/types/codepoint/character";

import {CodepointFavorite} from "../../libraries/types/codepoint/extension";
import {ParsedFavoriteInfo} from "../../libraries/types/savedata/favoriteInfo";

export interface FavoritesStore {
    update(key: CharacterKey, apply: (char: ParsedFavoriteInfo) => Partial<ParsedFavoriteInfo>): Promise<CodepointFavorite>;
    getFavorites(): Promise<CodepointFavorite[]>;
    /* Maybe replace with upsert*/
    addFavorite(key: CharacterKey): Promise<CodepointFavorite>;
    removeFavorite(key: CharacterKey): Promise<void>;


    /* Unused so far */
    upsert(key: CharacterKey, apply: (char?: ParsedFavoriteInfo) => ParsedFavoriteInfo): Promise<CodepointFavorite>;

}
