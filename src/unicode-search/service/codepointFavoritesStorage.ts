import {FavoritesStore} from "./favoritesStore";
import {CharacterKey} from "../../libraries/types/codepoint/character";
import {UnicodeSearchError} from "../errors/unicodeSearchError";
import {DexieDb} from "./dexieDb";

import {CodepointFavorite} from "../../libraries/types/codepoint/extension";
import {ParsedFavoriteInfo} from "../../libraries/types/savedata/favoriteInfo";

export class CodepointFavoritesStorage implements FavoritesStore {

    constructor(
        private readonly db: DexieDb,
    ) {
    }

    async upsert(
        key: CharacterKey,
        apply: (char?: ParsedFavoriteInfo) => ParsedFavoriteInfo
    ): Promise<CodepointFavorite> {
        const data = await this.getFavorites();

        const foundIndex = data.findIndex(ch => ch.id === key);
        const found = foundIndex >= 0;
        const index = found ? foundIndex : 0;

        const modified = {
            ...apply(found ? {...data[index]} : undefined),
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
        apply: (char: ParsedFavoriteInfo) => Partial<ParsedFavoriteInfo>
    ): Promise<CodepointFavorite> {
        const data = await this.getFavorites();

        const foundIndex = data.findIndex(ch => ch.id === key);

        if (foundIndex < 0) {
            throw new UnicodeSearchError(`No character '${key}' exists in favorites.`);
        }

        data[foundIndex] = {
            ...data[foundIndex],
            ...apply({...data[foundIndex]}),
            id: key,
        } as CodepointFavorite;

        await this.overwriteFavoritesData(data);

        return data[foundIndex];
    }

    async addFavorite(key: CharacterKey): Promise<CodepointFavorite> {
        const favorites = await this.getFavorites();
        const foundFavorite = favorites.find(fav => fav.id === key);

        if (foundFavorite != null) {
            return foundFavorite;
        }

        const newFavorite: CodepointFavorite = {
            id: key,
            added: new Date(),
            hotkey: false
        };

        favorites.unshift(newFavorite);
        await this.overwriteFavoritesData(favorites);

        return newFavorite;
    }

    async removeFavorite(key: CharacterKey): Promise<void> {
        console.log(`Removing favorite ${key}`);

        let favorites = await this.getFavorites();
        favorites = favorites.filter(fav => fav.id !== key);
        await this.overwriteFavoritesData(favorites);
    }

    async getFavorites(): Promise<CodepointFavorite[]> {
        return this.db.favorites.toArray();
    }

    private async overwriteFavoritesData(data: CodepointFavorite[]): Promise<void> {
        await this.db.favorites.clear();
        await this.db.favorites.bulkAdd(data);
    }
}
