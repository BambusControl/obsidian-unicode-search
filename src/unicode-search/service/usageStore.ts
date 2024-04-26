import {CharacterKey} from "../../libraries/types/codepoint/character";
import {CodepointParsedUsage, ParsedUsageInfo} from "../../libraries/types/savedata/usageData";

export interface UsageStore {
    updateCharacter(key: CharacterKey, apply: (char?: ParsedUsageInfo) => ParsedUsageInfo): Promise<CodepointParsedUsage>;
    getUsed(): Promise<CodepointParsedUsage[]>;
}
