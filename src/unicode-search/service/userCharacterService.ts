import {UnicodeSearchError} from "../errors/unicodeSearchError";
import type {
    Character,
    CharacterKey,
    CharacterWithUseHistory,
    FavoriteCharacter,
    MaybeCharacterWithUseHistory,
} from "../../libraries/types/codePoint/character";
import type {CodePointStore} from "./codePointStore";
import type {CharacterService} from "./characterService";
import type {UseHistoryStore} from "./useHistoryStore";

import type {FavoriteStore} from "./favoriteStore";
import type {UseRecord} from "../../libraries/types/savedata/useRecord";

export class UserCharacterService implements CharacterService {
    public constructor(
        private readonly codePointStore: CodePointStore,
        private readonly useHistoryStore: UseHistoryStore,
        private readonly favoritesStore: FavoriteStore,
    ) {
    }

    public async getOne(key: CharacterKey): Promise<Character> {
        const characters = await this.getAllCharacters();
        const char = characters.find((char) => char.id === key);

        if (char == null) {
            throw new UnicodeSearchError(`No character '${key}' exists.`);
        }

        return char;
    }

    public getAllCharacters(): Promise<Character[]> {
        return this.codePointStore.getCharacters();
    }

    public async getUsed(): Promise<CharacterWithUseHistory[]> {
        const allCharacters = await this.getAllCharacters();
        const usedCharacters = await this.useHistoryStore.getUsed();
        const usedKeys = usedCharacters.map((ch) => ch.id);

        return allCharacters
            .filter((ch) => usedKeys.contains(ch.id))
            .map((character) => ({
                ...usedCharacters.find((usage) => usage.id === character.id)!,
                ...character,
            }));
    }

    public async getFavorites(): Promise<FavoriteCharacter[]> {
        const allCharacters = await this.getAllCharacters();
        const favorite = await this.favoritesStore.getFavorites();
        const favoriteKeys = favorite.map((ch) => ch.id);

        return allCharacters
            .filter((ch) => favoriteKeys.contains(ch.id))
            .map((character) => ({
                ...favorite.find((usage) => usage.id === character.id)!,
                ...character,
            }));
    }

    public async getAll(): Promise<MaybeCharacterWithUseHistory[]> {
        const allCharacters = await this.getAllCharacters();
        const favoriteCharacters = await this.favoritesStore.getFavorites();
        const usedCharacters = await this.useHistoryStore.getUsed();

        return allCharacters.map((character) => ({
            ...favoriteCharacters.find((fav) => fav.id === character.id),
            ...usedCharacters.find((usage) => usage.id === character.id),
            ...character,
        }));
    }

    public recordUsage(key: CharacterKey): Promise<UseRecord> {
        const timestamp = new Date();

        return this.useHistoryStore.upsert(key, (current) => ({
            ...current,
            firstUse: current?.firstUse ?? timestamp,
            lastUse: timestamp,
            timesUsed: (current?.timesUsed ?? 0) + 1,
        }));
    }
}
