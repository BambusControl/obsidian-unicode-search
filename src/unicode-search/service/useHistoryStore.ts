import {CharacterKey} from "../../libraries/types/codePoint/character";


import {CodePointUse} from "../../libraries/types/codePoint/extension";
import {UseRecord} from "../../libraries/types/savedata/useRecord";

export interface UseHistoryStore {
    upsert(key: CharacterKey, apply: (char?: UseRecord) => UseRecord): Promise<CodePointUse>;
    getUsed(): Promise<CodePointUse[]>;
}
