import {Character} from "../../libraries/types/character";

export interface SaveDataStore {
	getData(): Promise<Character[]>;

	exportData(data: Partial<Character[]>): Promise<Character[]>;

	exportChar(data: Partial<Character>): Promise<Character>;

	isInitialized(): Promise<boolean>;

	setAsInitialized(): Promise<void>;
}
