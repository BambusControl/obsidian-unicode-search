import {Character, CharacterKey, MaybeUsedCharacter, UsedCharacter} from "../../libraries/types/codepoint/character";

import {UsageInfo} from "../../libraries/types/savedata/usageData";

export interface CharacterService {
	getOne(key: CharacterKey): Promise<Character>;
    getAllCharacters(): Promise<Character[]>;
    getUsed(): Promise<UsedCharacter[]>;
    getSorted(): Promise<MaybeUsedCharacter[]>;
	recordUsage(key: CharacterKey): Promise<UsageInfo>;
}
