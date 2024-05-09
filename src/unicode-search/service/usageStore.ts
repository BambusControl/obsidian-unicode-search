import {CharacterKey} from "../../libraries/types/codepoint/character";

import {CodepointParsedUsage} from "../../libraries/types/savedata/codepoint";
import {ParsedUsageInfo} from "../../libraries/types/savedata/parsedUsageInfo";

export interface UsageStore {
    updateCharacter(key: CharacterKey, apply: (char?: ParsedUsageInfo) => ParsedUsageInfo): Promise<CodepointParsedUsage>;
    getUsed(): Promise<CodepointParsedUsage[]>;
}
