import {SaveData} from "./save-data";
import {isTypeMetadata} from "./is-type-metadata";

export function isTypeSaveData(object: any): object is SaveData {
	return "meta" in object
		&& "data" in object
		&& isTypeMetadata(object.data);
}
