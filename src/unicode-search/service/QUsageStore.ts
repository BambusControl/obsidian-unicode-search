import {QCharacter, QCharacterKey, QCharacterTransform} from "../../libraries/types/qCharacter";

export interface QUsageStore {
    updateCharacter<Out>(key: QCharacterKey, apply: QCharacterTransform<Out>): Promise<QCharacter & Out>;
}
