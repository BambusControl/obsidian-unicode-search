import {QCharacterKey, QUsedCharacter} from "../../libraries/types/qCharacter";
import {QUsageData} from "../../libraries/types/data/QUsageData";
import {QUsageInfo} from "../../libraries/types/qUsageInfo";

export interface QUsageStore {
    updateCharacter(key: QCharacterKey, apply: (char: QUsageInfo) => QUsageInfo): Promise<QUsageData>;
    getUsed(): Promise<QUsageData[]>;
}
