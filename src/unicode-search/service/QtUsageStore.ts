import {QRootDataStore} from "./qRootDataStore";
import {QUsageStore} from "./QUsageStore";
import {QCharacter, QCharacterKey, QCharacterTransform} from "../../libraries/types/qCharacter";

export class QtUsageStore implements QUsageStore {

    constructor(private readonly store: QRootDataStore) {
    }

    updateCharacter<Out>(key: QCharacterKey, apply: QCharacterTransform<Out>): Promise<QCharacter & Out> {
        // NEXT
    }

}
