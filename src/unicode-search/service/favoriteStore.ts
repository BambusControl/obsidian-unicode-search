import {CharacterKey} from "../../libraries/types/codePoint/character";

import {CodePointFavorite} from "../../libraries/types/codePoint/extension";
import {ParsedFavorite} from "../../libraries/types/savedata/favorite";

export interface FavoriteStore {
    update(key: CharacterKey, apply: (char: ParsedFavorite) => Partial<ParsedFavorite>): Promise<CodePointFavorite>;

    getFavorites(): Promise<CodePointFavorite[]>;

    /* Maybe replace with upsert*/
    addFavorite(key: CharacterKey): Promise<CodePointFavorite>;

    removeFavorite(key: CharacterKey): Promise<void>;


    /* Unused so far */
    upsert(key: CharacterKey, apply: (char?: ParsedFavorite) => ParsedFavorite): Promise<CodePointFavorite>;

}
