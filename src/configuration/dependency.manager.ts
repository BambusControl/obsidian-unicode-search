import {App, Editor} from "obsidian";
import {FuzzySearchModal} from "src/components/fuzzy-search.modal";
import {ConstantUnicodeCharacterStorage} from "src/service/constant-unicode-character.storage";
import {PersistentSuggestionStorage} from "src/service/persistent-suggestion.storage";
import {UnicodeCharacterStorage} from "src/service/unicode-character.storage";
import {MyClass} from "../service/my.class";

export class DependencyManager {

	private readonly services: {
		UnicodeCharacterStorage: UnicodeCharacterStorage,
		PersistentSuggestionStorage: PersistentSuggestionStorage,
	} = {
		UnicodeCharacterStorage: new ConstantUnicodeCharacterStorage(),
		PersistentSuggestionStorage: new MyClass(),
	};

	public readonly factory = {
		FuzzySearchModal: this.createFuzzySearchModal,
	}

	private createFuzzySearchModal(app: App, editor: Editor): FuzzySearchModal {
        return new FuzzySearchModal(
            app,
            editor,
            this.services.UnicodeCharacterStorage,
            this.services.PersistentSuggestionStorage
        );
    }

}
