import {FilterDataNew} from "./filterDataNew";
import {UnicodeDataNew} from "./unicodeDataNew";
import {UsageDataNew} from "./usageDataNew";
import {FavoritesDataNew} from "./favoritesDataNew";
import {MetaDataNew} from "./metaDataNew";

export interface SaveDataNew {
    meta: MetaDataNew
    filter: FilterDataNew;
    unicode: UnicodeDataNew;
    usage: UsageDataNew;
    favorites: FavoritesDataNew;
}

export interface SaveDataNewSkeleton {
    meta: any;
    filter: any;
    unicode: any;
    usage: any;
    favorites: any;
}
