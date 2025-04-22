import {FavoriteInfo, ParsedFavoriteInfo} from "../types/savedata/favoriteInfo";

export function serializeFavoriteInfo<T>(value: T & ParsedFavoriteInfo): T & FavoriteInfo {
    return {
        ...value,
        added: value.added.toJSON(),
    }
}
