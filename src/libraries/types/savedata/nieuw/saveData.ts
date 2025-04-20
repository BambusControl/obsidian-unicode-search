import {FilterFragment} from "./filterFragment";
import {UnicodeFragment} from "./unicodeFragment";
import {UsageFragment} from "./usageFragment";
import {FavoritesFragment} from "./favoritesFragment";
import {MetaFragment} from "./metaFragment";

export interface SaveDataOf<T> {
    meta: T;
    filter: T;
    unicode: T;
    usage: T;
    favorites: T;
}

export interface SaveData {
    meta: MetaFragment;
    filter: FilterFragment;
    unicode: UnicodeFragment;
    usage: UsageFragment;
    favorites: FavoritesFragment;
}

