import {QCharacterKey} from "../../libraries/types/qCharacter";
import {QUsageData} from "../../libraries/types/data/QUsageData";

export interface QUsageStore {
    updateCharacter<Out>(key: QCharacterKey, apply: (char: QUsageData) => QUsageData & Out): Promise<QUsageData & Out>;
}
