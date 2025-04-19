import {FilterDataNew} from "./filterDataNew";
import {UnicodeDataNew} from "./unicodeDataNew";
import {UsageDataNew} from "./usageDataNew";
import {FavoritesDataNew} from "./favoritesDataNew";

export interface SaveDataNew {
    filter: FilterDataNew;
    unicode: UnicodeDataNew;
    usage: UsageDataNew;
    favorites: FavoritesDataNew;
}

export interface SaveDataNewSkeleton {
    filter: any;
    unicode: any;
    usage: any;
    favorites: any;
}
