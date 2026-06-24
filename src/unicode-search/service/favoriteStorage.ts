import type { FavoriteStore } from "./favoriteStore";
import type { CharacterKey } from "../../libraries/types/codePoint/character";
import { serializeFavorite } from "../../libraries/helpers/serializeFavorite";
import { UnicodeSearchError } from "../errors/unicodeSearchError";
import type { RootDataStore } from "./rootDataStore";
import type { FavoriteChunk } from "../../libraries/types/savedata/favoriteChunk";

import type { CodePointFavorite } from "../../libraries/types/codePoint/extension";
import type { ParsedFavorite } from "../../libraries/types/savedata/favorite";

export class FavoriteStorage implements FavoriteStore {
	constructor(private readonly store: RootDataStore) {}

	async upsert(
		key: CharacterKey,
		apply: (char?: ParsedFavorite) => ParsedFavorite,
	): Promise<CodePointFavorite> {
		const data = await this.getFavorites();

		const foundIndex = data.findIndex((ch) => ch.id === key);
		const found = foundIndex >= 0;
		const index = found ? foundIndex : 0;

		const modified = {
			...apply(found ? { ...data[index] } : undefined),
			id: key,
		};

		if (found) {
			data[foundIndex] = modified;
		} else {
			data.unshift(modified);
		}

		await this.overwriteFavoritesData(data);

		return data[index];
	}

	async update(
		key: CharacterKey,
		apply: (char: ParsedFavorite) => Partial<ParsedFavorite>,
	): Promise<CodePointFavorite> {
		const data = await this.getFavorites();

		const foundIndex = data.findIndex((ch) => ch.id === key);

		if (foundIndex < 0) {
			throw new UnicodeSearchError(
				`No character '${key}' exists in favorites.`,
			);
		}

		data[foundIndex] = {
			...data[foundIndex],
			...apply({ ...data[foundIndex] }),
			id: key,
		} as CodePointFavorite;

		await this.overwriteFavoritesData(data);

		return data[foundIndex];
	}

	async addFavorite(key: CharacterKey): Promise<CodePointFavorite> {
		const favorites = await this.getFavorites();
		const foundFavorite = favorites.find((fav) => fav.id === key);

		if (foundFavorite != null) {
			return foundFavorite;
		}

		const newFavorite: CodePointFavorite = {
			id: key,
			added: new Date(),
			quickInsertEnabled: false,
		};

		favorites.unshift(newFavorite);
		await this.overwriteFavoritesData(favorites);

		return newFavorite;
	}

	async removeFavorite(key: CharacterKey): Promise<void> {
		console.log(`Removing favorite ${key}`);

		let favorites = await this.getFavorites();
		favorites = favorites.filter((fav) => fav.id !== key);
		await this.overwriteFavoritesData(favorites);
	}

	async getFavorites(): Promise<CodePointFavorite[]> {
		return (await this.store.getFavorites()).codePoints.map((fav) => ({
			...fav,
			added: new Date(fav.added),
		}));
	}

	private async overwriteFavoritesData(
		data: CodePointFavorite[],
	): Promise<void> {
		const newData = await this.mergeFavorites({
			codePoints: data.map(serializeFavorite),
		});

		await this.store.overwriteFavorites(newData);
	}

	private async mergeFavorites(
		data: Partial<FavoriteChunk>,
	): Promise<FavoriteChunk> {
		const storedData = await this.store.getFavorites();

		const newData = {
			...storedData,
			...data,
		};

		return await this.store.overwriteFavorites(newData);
	}
}
