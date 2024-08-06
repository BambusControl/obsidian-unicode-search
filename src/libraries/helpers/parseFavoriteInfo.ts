import {FavoriteInfo} from "../types/savedata/favoriteInfo";
import {ParsedFavoriteInfo} from "../types/savedata/parsedFavoriteInfo";

export function parseFavoriteInfo<T>(value: T & FavoriteInfo): T & ParsedFavoriteInfo {
    return {
        ...value,
        added: new Date(value.added),
    }
}
