import { FavoritesStore } from "./favoritesStore";
import {CharacterKey} from "../../libraries/types/codepoint/character";
import { serializeFavoriteInfo } from "../../libraries/helpers/serializeFavoriteInfo";
import {UnicodeSearchError} from "../errors/unicodeSearchError";
import {RootDataStore} from "./rootDataStore";
import {FavoritesFragment} from "../../libraries/types/savedata/favoritesFragment";

import {CodepointParsedFavorite} from "../../libraries/types/codepoint/extension";
import {ParsedFavoriteInfo} from "../../libraries/types/savedata/favoriteInfo";

export class CodepointFavoritesStorage implements FavoritesStore {

    constructor(
        private readonly store: RootDataStore,
    ) {
    }

    async upsert(
        key: CharacterKey,
        apply: (char?: ParsedFavoriteInfo) => ParsedFavoriteInfo
    ): Promise<CodepointParsedFavorite>
    {
        const data = await this.getFavorites();

        const foundIndex = data.findIndex(ch => ch.codepoint === key);
        const found = foundIndex >= 0;
        const index = found ? foundIndex : 0;

        const modified = {
            ...apply(found ? {...data[index]} : undefined),
            codepoint: key,
        };

        if (found) {
            data[foundIndex] = modified
        } else {
            data.unshift(modified)
        }

        await this.overwriteFavoritesData(data)

        return data[index];
    }

    async update(
        key: CharacterKey,
        apply: (char: ParsedFavoriteInfo) => Partial<ParsedFavoriteInfo>
    ): Promise<CodepointParsedFavorite>
    {
        const data = await this.getFavorites();

        const foundIndex = data.findIndex(ch => ch.codepoint === key);

        if (foundIndex < 0) {
            throw new UnicodeSearchError(`No character '${key}' exists in favorites.`);
        }

        const modified = {
            ...data[foundIndex],
            ...apply({...data[foundIndex]}),
            codepoint: key,
        } as CodepointParsedFavorite;

        data[foundIndex] = modified

        await this.overwriteFavoritesData(data)

        return data[foundIndex];
    }

    async addFavorite(key: CharacterKey): Promise<CodepointParsedFavorite> {
        const favorites = await this.getFavorites();
        const foundFavorite = favorites.find(fav => fav.codepoint === key);

        if (foundFavorite != null) {
            return foundFavorite;
        }

        const newFavorite: CodepointParsedFavorite = {
            codepoint: key,
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
        favorites = favorites.filter(fav => fav.codepoint !== key);
        await this.overwriteFavoritesData(favorites);
    }

    async getFavorites(): Promise<CodepointParsedFavorite[]> {
        return (await this.store.getFavorites()).codepoints.map(fav => ({
            ...fav,
            added: new Date(fav.added),
        }));
    }

    private async overwriteFavoritesData(data: CodepointParsedFavorite[]): Promise<void> {
        const newData = await this.mergeFavorites({
            codepoints: data.map(serializeFavoriteInfo),
        });

        await this.store.overwriteFavorites(newData);
    }

    private async mergeFavorites(data: Partial<FavoritesFragment>): Promise<FavoritesFragment> {
        const storedData = await this.store.getFavorites();

        const newData = {
            ...storedData,
            ...data
        };

        return await this.store.overwriteFavorites(newData);
    }
}
