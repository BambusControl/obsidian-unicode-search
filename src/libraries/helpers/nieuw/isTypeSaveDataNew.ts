import {SaveDataNew, SaveDataNewSkeleton} from "../../types/savedata/nieuw/saveDataNew";
import {Bambus, InitializedBambus} from "../../types/savedata/nieuw/bambus";
import {FilterDataNew} from "../../types/savedata/nieuw/filterDataNew";
import {FavoritesDataNew} from "../../types/savedata/nieuw/favoritesDataNew";
import {UnicodeDataNew} from "../../types/savedata/nieuw/unicodeDataNew";
import {UnicodeFilter} from "../../types/savedata/oud/unicodeFilter";
import {UsageDataNew} from "../../types/savedata/nieuw/usageDataNew";


export function isTypeSaveDataNewSkeleton(object: any): object is SaveDataNewSkeleton {
    return object != null
        && "filter" in object
        && "unicode" in object
        && "usage" in object
        && "favorites" in object
        ;
}

export function isTypeSaveDataNew(object: any): object is SaveDataNew {
    return isTypeSaveDataNewSkeleton(object)
        && isTypeBambus(object.filter ?? {})
        && isTypeBambus(object.usage ?? {})
        && isTypeBambus(object.unicode ?? {})
        && isTypeBambus(object.favorites ?? {})
        ;
}
export function isTypeBambus(object: any): object is Bambus {
    return object != null
        && "initialized" in object
        && "version" in object
        ;
}

export function isTypeInitializedBambus(object: any): object is InitializedBambus {
    return isTypeBambus(object)
        && object.initialized === true
        ;
}

export function isTypeFilterDataNew(object: any): object is FilterDataNew {
    return isTypeBambus(object)
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

export function isTypeFavoritesDataNew(object: any): object is FavoritesDataNew {
    return isTypeBambus(object)
        && "codepoints" in object
        && Array.isArray(object.codepoints)
        ;
}

export function isTypeUnicodeDataNew(object: any): object is UnicodeDataNew {
    return isTypeBambus(object)
        && "codepoints" in object
        && Array.isArray(object.codepoints)
        ;
}

export function isTypeUsageDataNew(object: any): object is UsageDataNew {
    return isTypeBambus(object)
        && "codepoints" in object
        && Array.isArray(object.codepoints)
        ;
}
