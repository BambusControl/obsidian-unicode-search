import {
    Character,
    CharacterKey,
    FavoriteCharacter,
    MaybeUsedCharacter,
    UsedCharacter
} from "../../libraries/types/codepoint/character";


import {ParsedUsageInfo} from "../../libraries/types/savedata/usageInfo";

export interface CharacterService {
	getOne(key: CharacterKey): Promise<Character>;
    getAllCharacters(): Promise<Character[]>;
    getUsed(): Promise<UsedCharacter[]>;
    getFavorites(): Promise<FavoriteCharacter[]>;
    getAll(): Promise<MaybeUsedCharacter[]>;
	recordUsage(key: CharacterKey): Promise<ParsedUsageInfo>;
}
