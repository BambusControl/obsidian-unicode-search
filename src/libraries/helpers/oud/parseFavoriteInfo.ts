import {FavoriteInfo} from "../../types/savedata/oud/favoriteInfo";
import {ParsedFavoriteInfo} from "../../types/savedata/oud/parsedFavoriteInfo";

export function parseFavoriteInfo<T>(value: T & FavoriteInfo): T & ParsedFavoriteInfo {
    return {
        ...value,
        added: new Date(value.added),
    }
}
