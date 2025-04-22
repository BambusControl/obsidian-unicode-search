import {CharacterKey} from "../../libraries/types/codepoint/character";


import {CodepointUse} from "../../libraries/types/codepoint/extension";
import {UsageInfo} from "../../libraries/types/savedata/usageInfo";

export interface UsageStore {
    upsert(key: CharacterKey, apply: (char?: UsageInfo) => UsageInfo): Promise<CodepointUse>;
    getUsed(): Promise<CodepointUse[]>;
}
