import {UnicodeFragment} from "../../libraries/types/savedata/unicodeFragment";
import {FilterFragment} from "../../libraries/types/savedata/filterFragment";
import {CharacterUseFragment} from "../../libraries/types/savedata/usageFragment";
import {FavoritesFragment} from "../../libraries/types/savedata/favoritesFragment";
import {MetaFragment} from "../../libraries/types/savedata/metaFragment";

export interface RootDataStore {
    getMeta(): Promise<MetaFragment>
    overwriteMeta(data: MetaFragment): Promise<MetaFragment>

    getUnicode(): Promise<UnicodeFragment>
    overwriteUnicode(data: UnicodeFragment): Promise<UnicodeFragment>

    getFilter(): Promise<FilterFragment>
    overwriteFilter(settings: FilterFragment): Promise<FilterFragment>

    getUsage(): Promise<CharacterUseFragment>
    overwriteUsage(usage: CharacterUseFragment): Promise<CharacterUseFragment>

    getFavorites(): Promise<FavoritesFragment>
    overwriteFavorites(favorites: FavoritesFragment): Promise<FavoritesFragment>
}
