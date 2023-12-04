import {SaveData} from "./saveData";
import {isTypeMetadata} from "./isTypeMetadata";

export function isTypeSaveData(object: any): object is SaveData {
	return "meta" in object
		&& "data" in object
		&& isTypeMetadata(object.meta);
}
