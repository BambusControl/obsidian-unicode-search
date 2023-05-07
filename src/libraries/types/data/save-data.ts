import {Characters} from "../unicode.character";
import {Metadata} from "./metadata";

export interface SaveData {
	meta: Metadata;
	data: Characters;
}

