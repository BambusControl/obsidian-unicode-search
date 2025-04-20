import {SaveData, SaveDataSkeleton} from "../../types/savedata/nieuw/saveData";
import {DataFragment, InitializedDataFragment} from "../../types/savedata/nieuw/dataFragment";
import {FilterFragment} from "../../types/savedata/nieuw/filterFragment";
import {FavoritesFragment} from "../../types/savedata/nieuw/favoritesFragment";
import {UnicodeFragment} from "../../types/savedata/nieuw/unicodeFragment";
import {UnicodeFilter} from "../../types/savedata/oud/unicodeFilter";
import {UsageFragment} from "../../types/savedata/nieuw/usageFragment";
import {MetaFragment} from "../../types/savedata/nieuw/metaFragment";


export function isTypeSaveDataSkeleton(object: any): object is SaveDataSkeleton {
    return object != null
        && "meta" in object
        && "filter" in object
        && "unicode" in object
        && "usage" in object
        && "favorites" in object
        ;
}

export function isTypeDataFragment(object: any): object is DataFragment {
    return object != null
        && "initialized" in object
        && "version" in object
        ;
}

export function isTypeMetaFragment(object: any): object is MetaFragment {
    return isTypeDataFragment(object)
        && "events" in object
        && Array.isArray(object.events)
        ;
}
export function isTypeFilterFragment(object: any): object is FilterFragment {
    return isTypeDataFragment(object)
        && "modified" in object
        && "unicode" in object
        && isTypeUnicodeFilter(object.unicode)
        ;
}

export function isTypeUnicodeFilter(object: any): object is UnicodeFilter {
    return "planes" in object
        && Array.isArray(object.planes)
        && "categoryGroups" in object
        && Array.isArray(object.categoryGroups)
        ;
}

export function isTypeFavoritesFragment(object: any): object is FavoritesFragment {
    return isTypeDataFragment(object)
        && "codepoints" in object
        && Array.isArray(object.codepoints)
        ;
}

export function isTypeUnicodeFragment(object: any): object is UnicodeFragment {
    return isTypeDataFragment(object)
        && "codepoints" in object
        && Array.isArray(object.codepoints)
        ;
}

export function isTypeUsageFragment(object: any): object is UsageFragment {
    return isTypeDataFragment(object)
        && "codepoints" in object
        && Array.isArray(object.codepoints)
        ;
}
