import { CharacterKey } from "../../libraries/types/codepoint/character";
import {CodepointParsedFavorite} from "../../libraries/types/savedata/codepoint";
import {ParsedFavoriteInfo} from "../../libraries/types/savedata/parsedFavoriteInfo";

export interface FavoritesStore {
    update(key: CharacterKey, apply: (char: ParsedFavoriteInfo) => Partial<ParsedFavoriteInfo>): Promise<CodepointParsedFavorite>;
    getFavorites(): Promise<CodepointParsedFavorite[]>;
    /* Maybe replace with upsert*/
    addFavorite(key: CharacterKey): Promise<CodepointParsedFavorite>;
    removeFavorite(key: CharacterKey): Promise<void>;


    /* Unused so far */
    upsert(key: CharacterKey, apply: (char?: ParsedFavoriteInfo) => ParsedFavoriteInfo): Promise<CodepointParsedFavorite>;

}
