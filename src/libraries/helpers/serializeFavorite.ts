import type {Favorite, ParsedFavorite} from "../types/savedata/favorite";

export function serializeFavorite<T>(value: T & ParsedFavorite): T & Favorite {
    return {
        ...value,
        added: value.added.toJSON(),
    };
}
