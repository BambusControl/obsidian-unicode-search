import {QCharacter, QCharacterKey, QUsedCharacter} from "../../libraries/types/qCharacter";

export interface QCharacterService {
	getOne(key: QCharacterKey): Promise<QCharacter>;
	getAll(): Promise<QCharacter[]>;
    getUsed(): Promise<QUsedCharacter[]>
	recordUsage(key: QCharacterKey): Promise<QUsedCharacter>;
}
