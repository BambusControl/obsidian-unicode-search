import { CharacterKey } from "../../libraries/types/codepoint/character";
import {CodepointParsedFavorite, CodepointParsedUsage} from "../../libraries/types/savedata/codepoint";
import {ParsedUsageInfo} from "../../libraries/types/savedata/parsedUsageInfo";
import {ParsedFavoriteInfo} from "../../libraries/types/savedata/parsedFavoriteInfo";

export interface FavoritesStore {
    upsert(key: CharacterKey, apply: (char?: ParsedFavoriteInfo) => ParsedFavoriteInfo): Promise<CodepointParsedFavorite>;
    update(key: CharacterKey, apply: (char: ParsedFavoriteInfo) => Partial<ParsedFavoriteInfo>): Promise<CodepointParsedFavorite>;
    getFavorites(): Promise<CodepointParsedFavorite[]>;


    /* Unused so far */
    addFavorite(key: CharacterKey): Promise<void>;
    removeFavorite(key: CharacterKey): Promise<void>;

}
