import {UnicodeDataNew} from "../../libraries/types/savedata/nieuw/unicodeDataNew";
import {FilterDataNew} from "../../libraries/types/savedata/nieuw/filterDataNew";
import {UsageDataNew} from "../../libraries/types/savedata/nieuw/usageDataNew";
import {FavoritesDataNew} from "../../libraries/types/savedata/nieuw/favoritesDataNew";

export interface RootDataStoreNew {
    getUnicode(): Promise<UnicodeDataNew>
    overwriteUnicode(data: UnicodeDataNew): Promise<UnicodeDataNew>

    getFilter(): Promise<FilterDataNew>
    overwriteFilter(settings: FilterDataNew): Promise<FilterDataNew>

    getUsage(): Promise<UsageDataNew>
    overwriteUsage(usage: UsageDataNew): Promise<UsageDataNew>

    getFavorites(): Promise<FavoritesDataNew>
    overwriteFavorites(favorites: FavoritesDataNew): Promise<FavoritesDataNew>
}
