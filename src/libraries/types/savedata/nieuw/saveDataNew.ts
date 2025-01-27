import {FilterDataNew} from "./filterDataNew";
import {UnicodeDataNew} from "./unicodeDataNew";
import {UsageDataNew} from "./usageDataNew";
import {FavoritesDataNew} from "./favoritesDataNew";
import {Bambus} from "./bambus";

export interface SaveDataNew {
    filter: FilterDataNew;
    unicode: UnicodeDataNew;
    usage: UsageDataNew;
    favorites: FavoritesDataNew;
}

export interface SaveDataNewSkeleton {
    filter: null;
    unicode: null;
    usage: null;
    favorites: null;
}
