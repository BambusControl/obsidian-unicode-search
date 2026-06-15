import {FavoriteInfo, ParsedFavoriteInfo} from "../types/savedata/favoriteInfo";

export function parseFavoriteInfo<T>(value: T & FavoriteInfo): T & ParsedFavoriteInfo {
    return {
        ...value,
        added: new Date(value.added),
    }
}
