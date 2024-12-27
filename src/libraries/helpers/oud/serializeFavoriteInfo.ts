import {FavoriteInfo} from "../../types/savedata/oud/favoriteInfo";
import {ParsedFavoriteInfo} from "../../types/savedata/oud/parsedFavoriteInfo";

export function serializeFavoriteInfo<T>(value: T & ParsedFavoriteInfo): T & FavoriteInfo {
    return {
        ...value,
        added: value.added.toJSON(),
    }
}
