import {CharacterKey} from "../../libraries/types/codepoint/character";
import {CodepointUsage, UsageInfo} from "../../libraries/types/savedata/usageData";

export interface UsageStore {
    updateCharacter(key: CharacterKey, apply: (char: UsageInfo) => UsageInfo): Promise<CodepointUsage>;
    getUsed(): Promise<CodepointUsage[]>;
}
