import type { PersistCache } from "../../libraries/types/persistCache";
import type { SaveData } from "../../libraries/types/savedata/saveData";
import type { PoolChunk } from "../../libraries/types/savedata/poolChunk";
import type { CharacterChunk } from "../../libraries/types/savedata/characterChunk";
import type { UseHistoryChunk } from "../../libraries/types/savedata/useHistoryChunk";
import type { FavoriteChunk } from "../../libraries/types/savedata/favoriteChunk";
import type { RootDataStore } from "./rootDataStore";
import type { MetaChunk } from "../../libraries/types/savedata/metaChunk";

export class RootPluginDataStorage implements RootDataStore {
	constructor(private readonly storedData: PersistCache<SaveData>) {}

	async getMeta(): Promise<MetaChunk> {
		return (await this.storedData.get()).meta;
	}

	async overwriteMeta(data: MetaChunk): Promise<MetaChunk> {
		const mergedData = await this.mergeData({
			meta: data,
		});

		return mergedData.meta;
	}

	async getCharacters(): Promise<CharacterChunk> {
		return (await this.storedData.get()).characters;
	}

	async overwriteCharacters(data: CharacterChunk): Promise<CharacterChunk> {
		const mergedData = await this.mergeData({
			characters: data,
		});

		return mergedData.characters;
	}

	async getPool(): Promise<PoolChunk> {
		return (await this.storedData.get()).pool;
	}

	async overwritePool(pool: PoolChunk): Promise<PoolChunk> {
		const mergedData = await this.mergeData({
			pool: pool,
		});

		return mergedData.pool;
	}

	async getUseHistory(): Promise<UseHistoryChunk> {
		return (await this.storedData.get()).useHistory;
	}

	async overwriteUseHistory(
		useHistory: UseHistoryChunk,
	): Promise<UseHistoryChunk> {
		const mergedData = await this.mergeData({
			useHistory: useHistory,
		});

		return mergedData.useHistory;
	}

	async getFavorites(): Promise<FavoriteChunk> {
		return (await this.storedData.get()).favorites;
	}

	async overwriteFavorites(favorites: FavoriteChunk): Promise<FavoriteChunk> {
		const mergedData = await this.mergeData({
			favorites: favorites,
		});

		return mergedData.favorites;
	}

	private async mergeData(data: Partial<SaveData>): Promise<SaveData> {
		const storedData = await this.storedData.get();

		const newData: SaveData = {
			...storedData,
			...data,
		};

		this.storedData.set(newData);
		return await this.storedData.persist();
	}
}
