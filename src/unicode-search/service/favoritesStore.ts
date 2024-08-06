import { CharacterKey } from "../../libraries/types/codepoint/character";
import {CodepointParsedFavorite} from "../../libraries/types/savedata/codepoint";

export interface FavoritesStore {
    addFavorite(key: CharacterKey): Promise<void>;

    removeFavorite(key: CharacterKey): Promise<void>;

    getFavorites(): Promise<CodepointParsedFavorite[]>;
}
