import {SaveDataNew, SaveDataNewSkeleton} from "../../types/savedata/nieuw/saveDataNew";
import {Bambus} from "../../types/savedata/nieuw/bambus";
import {FilterDataNew} from "../../types/savedata/nieuw/filterDataNew";
import {FavoritesDataNew} from "../../types/savedata/nieuw/favoritesDataNew";
import {UnicodeDataNew} from "../../types/savedata/nieuw/unicodeDataNew";
import {UnicodeFilter} from "../../types/savedata/oud/unicodeFilter";
import {UsageDataNew} from "../../types/savedata/nieuw/usageDataNew";

export function isTypeSaveDataNew(object: any): object is SaveDataNew {
    return object != null
        && "settings" in object
        && isTypeBambus(object.settings ?? {})
        && "usage" in object
        && isTypeBambus(object.usage ?? {})
        && "unicode" in object
        && isTypeBambus(object.unicode ?? {})
        ;
}

export function isTypeSaveDataNewSkeleton(object: any): object is SaveDataNewSkeleton {
    return object != null
        && "settings" in object
        && object.settings == null
        && "usage" in object
        && object.usage == null
        && "unicode" in object
        && object.unicode == null
        ;
}

export function isTypeBambus(object: any): object is Bambus {
    return "initialized" in object
        && "version" in object
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
