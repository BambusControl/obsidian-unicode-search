import {CharacterKey} from "../../libraries/types/qCharacter";
import {UsageData} from "../../libraries/types/data/QUsageData";
import {UsageInfo} from "../../libraries/types/qUsageInfo";

export interface UsageStore {
    updateCharacter(key: CharacterKey, apply: (char: UsageInfo) => UsageInfo): Promise<UsageData>;
    getUsed(): Promise<UsageData[]>;
}
