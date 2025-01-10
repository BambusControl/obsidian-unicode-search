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
