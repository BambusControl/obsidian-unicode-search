import {FavoriteInfo} from "../types/savedata/favoriteInfo";
import {ParsedFavoriteInfo} from "../types/savedata/parsedFavoriteInfo";

export function serializeFavoriteInfo<T>(value: T & ParsedFavoriteInfo): T & FavoriteInfo {
    return {
        ...value,
        added: value.added.toJSON(),
    }
}
