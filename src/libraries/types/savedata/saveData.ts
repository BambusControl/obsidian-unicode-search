import type { PoolChunk } from "./poolChunk";
import type { CharacterChunk } from "./characterChunk";
import type { UseHistoryChunk } from "./useHistoryChunk";
import type { FavoriteChunk } from "./favoriteChunk";
import type { MetaChunk } from "./metaChunk";
import type { DataChunk } from "./dataChunk";

/**
 * Generic structure of `data.json`
 */
export interface SaveDataOf<T> {
	/**
	 * Metadata information about the save data itself
	 */
	meta: T;

	/**
	 * User's character pool configuration
	 */
	pool: T;

	/**
	 * Local character database
	 */
	characters: T;

	/**
	 * User insertion history
	 */
	useHistory: T;

	/**
	 * Favorites saved manually by the user
	 */
	favorites: T;
}

/**
 * Structure of `data.json`, where each fragment is a self-managed data fragment
 */
export interface SaveData extends SaveDataOf<DataChunk> {
	meta: MetaChunk;
	pool: PoolChunk;
	characters: CharacterChunk;
	useHistory: UseHistoryChunk;
	favorites: FavoriteChunk;
}
