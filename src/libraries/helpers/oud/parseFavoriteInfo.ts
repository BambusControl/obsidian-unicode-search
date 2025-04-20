import {FavoriteInfo} from "../../types/savedata/oud/favoriteInfo";
import {ParsedFavoriteInfo} from "../../types/savedata/oud/parsedFavoriteInfo";

/* TODO [NEXT]: This had to be used somewhere */
//noinspection JSUnusedGlobalSymbols
export function parseFavoriteInfo<T>(value: T & FavoriteInfo): T & ParsedFavoriteInfo {
    return {
        ...value,
        added: new Date(value.added),
    }
}
