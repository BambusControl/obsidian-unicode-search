import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {PersistentSuggestionStorage} from "./persistent-suggestion.storage";

export class MyClass implements PersistentSuggestionStorage {
	get(): UnicodeCharacterInfoModel {
		return {
			char: "d",
			name: "hello"
		};
	}

	getAll(): UnicodeCharacterInfoModel[] {
		return [];
	}

	store(character: UnicodeCharacterInfoModel): void {
	}

}
