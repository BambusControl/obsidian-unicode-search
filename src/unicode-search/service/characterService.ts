import {
    Character,
    CharacterKey,
    CharacterWithUseHistory,
    FavoriteCharacter,
    MaybeCharacterWithUseHistory
} from "../../libraries/types/codePoint/character";


import {UseRecord} from "../../libraries/types/savedata/useRecord";

export interface CharacterService {
    getOne(key: CharacterKey): Promise<Character>;

    getAllCharacters(): Promise<Character[]>;

    getUsed(): Promise<CharacterWithUseHistory[]>;

    getFavorites(): Promise<FavoriteCharacter[]>;

    getAll(): Promise<MaybeCharacterWithUseHistory[]>;

    recordUsage(key: CharacterKey): Promise<UseRecord>;
}
