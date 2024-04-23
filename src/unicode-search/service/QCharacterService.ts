import {Character, CharacterKey, MaybeUsedCharacter, UsedCharacter} from "../../libraries/types/qCharacter";
import {UsageInfo} from "../../libraries/types/qUsageInfo";

export interface CharacterService {
	getOne(key: CharacterKey): Promise<Character>;
    getAllCharacters(): Promise<Character[]>;
    getUsed(): Promise<UsedCharacter[]>;
    getSorted(): Promise<MaybeUsedCharacter[]>;
	recordUsage(key: CharacterKey): Promise<UsageInfo>;
}
