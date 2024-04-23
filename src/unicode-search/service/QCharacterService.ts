import {QCharacter, QCharacterKey, QMaybeUsedCharacter, QUsedCharacter} from "../../libraries/types/qCharacter";
import {QUsageInfo} from "../../libraries/types/qUsageInfo";

export interface QCharacterService {
	getOne(key: QCharacterKey): Promise<QCharacter>;
    getAllCharacters(): Promise<QCharacter[]>;
    getUsed(): Promise<QUsedCharacter[]>;
    getSorted(): Promise<QMaybeUsedCharacter[]>;
	recordUsage(key: QCharacterKey): Promise<QUsageInfo>;
}
