import {CharacterKey} from "../../libraries/types/codepoint/character";

import {CodepointParsedUsage} from "../../libraries/types/savedata/oud/codepoint";
import {ParsedUsageInfo} from "../../libraries/types/savedata/oud/parsedUsageInfo";

export interface UsageStore {
    upsert(key: CharacterKey, apply: (char?: ParsedUsageInfo) => ParsedUsageInfo): Promise<CodepointParsedUsage>;
    getUsed(): Promise<CodepointParsedUsage[]>;
}
