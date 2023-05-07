import {Metadata} from "./metadata";

export function isTypeMetadata(object: any): object is Metadata {
	return "initialized" in object
		&& "version" in object;
}
