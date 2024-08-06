import { RootDataStore } from "../rootDataStore";
import { FavoritesStore } from "../favoritesStore";
import { CharacterKey } from "../../../libraries/types/codepoint/character";
import { CodepointFavorite, CodepointParsedFavorite } from "../../../libraries/types/savedata/codepoint";
import { FavoriteInfo } from "../../../libraries/types/savedata/favoriteInfo";
import { ParsedFavoriteInfo } from "../../../libraries/types/savedata/parsedFavoriteInfo";
import { FavoritesData } from "src/libraries/types/savedata/favoritesData";
import { serializeFavoriteInfo } from "../../../libraries/helpers/serializeFavoriteInfo";

export class CodepointFavoritesStorage implements FavoritesStore {

    constructor(
        private readonly store: RootDataStore,
    ) {
    }

    async addFavorite(key: CharacterKey): Promise<void> {
        const favorites = await this.getFavorites();
        const isFavorite = favorites.some(fav => fav.codepoint === key);

        if (!isFavorite) {
            const newFavorite: CodepointParsedFavorite = {
                codepoint: key,
                added: new Date(),
                hotkey: false
            };
            favorites.unshift(newFavorite);
            await this.overwriteFavoritesData(favorites);
        }
    }

    async removeFavorite(key: CharacterKey): Promise<void> {
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

    private async mergeFavorites(data: Partial<FavoritesData>): Promise<FavoritesData> {
        const storedData = await this.store.getFavorites();

        const newData = {
            ...storedData,
            ...data
        };

        return await this.store.overwriteFavorites(newData);
    }
}
