import {CharacterKey} from "../../libraries/types/codepoint/character";


import {CodepointParsedUsage} from "../../libraries/types/codepoint/extension";
import {ParsedUsageInfo} from "../../libraries/types/savedata/usageInfo";

export interface UsageStore {
    upsert(key: CharacterKey, apply: (char?: ParsedUsageInfo) => ParsedUsageInfo): Promise<CodepointParsedUsage>;
    getUsed(): Promise<CodepointParsedUsage[]>;
}
