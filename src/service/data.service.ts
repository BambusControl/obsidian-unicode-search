import {Character, CharacterMap} from "../data/unicode-character-info.model";

export interface DataService {
	getData(): Promise<CharacterMap>;

	exportData(data: Partial<CharacterMap>): Promise<CharacterMap>;

	exportChar(data: Partial<Character>): Promise<Character>;

	isInitialized(): Promise<boolean>;

	setAsInitialized(): Promise<void>;
}
