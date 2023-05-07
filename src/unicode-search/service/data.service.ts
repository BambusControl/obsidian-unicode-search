import {Character, Characters} from "../../libraries/types/unicode.character";

export interface DataService {
	getData(): Promise<Characters>;

	exportData(data: Partial<Characters>): Promise<Characters>;

	exportChar(data: Partial<Character>): Promise<Character>;

	isInitialized(): Promise<boolean>;

	setAsInitialized(): Promise<void>;
}
