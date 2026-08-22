import type {CharacterChunk} from "../../libraries/types/savedata/characterChunk";
import type {PoolChunk} from "../../libraries/types/savedata/poolChunk";
import type {UseHistoryChunk} from "../../libraries/types/savedata/useHistoryChunk";
import type {FavoriteChunk} from "../../libraries/types/savedata/favoriteChunk";
import type {MetaChunk} from "../../libraries/types/savedata/metaChunk";

export interface RootDataStore {
    getMeta(): Promise<MetaChunk>;

    overwriteMeta(data: MetaChunk): Promise<MetaChunk>;

    getCharacters(): Promise<CharacterChunk>;

    overwriteCharacters(data: CharacterChunk): Promise<CharacterChunk>;

    getPool(): Promise<PoolChunk>;

    overwritePool(pool: PoolChunk): Promise<PoolChunk>;

    getUseHistory(): Promise<UseHistoryChunk>;

    overwriteUseHistory(useHistory: UseHistoryChunk): Promise<UseHistoryChunk>;

    getFavorites(): Promise<FavoriteChunk>;

    overwriteFavorites(favorites: FavoriteChunk): Promise<FavoriteChunk>;
}
