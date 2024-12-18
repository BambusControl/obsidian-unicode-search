import {FuzzySearchModal} from "./fuzzySearchModal";
import {App} from "obsidian";
import {CharacterService} from "../service/characterService";
import {Character} from "../../libraries/types/codepoint/character";
import {INSERT_CHAR_INSTRUCTION} from "./visualElements";
import {MetaCharacterSearchResult} from "./characterSearch";
import {Maybe} from "../../libraries/types/maybe";

export class PickCharacterModal extends FuzzySearchModal {
    private constructor(
        app: App,
        characterService: CharacterService,
        private readonly resolve: (value: (PromiseLike<Maybe<Character>> | Maybe<Character>)) => void,
    ) {
        super(app, characterService, INSERT_CHAR_INSTRUCTION);
    }

    /**
     * Open the modal and resolve the promise with the chosen character
     */
    static open(app: App, characterService: CharacterService): Promise<Maybe<Character>> {
        return new Promise<Maybe<Character>>(resolve => {
            const modal = new PickCharacterModal(app, characterService, resolve);
            modal.open();
        })
    }

    override onChooseSuggestion(search: MetaCharacterSearchResult, evt: MouseEvent | KeyboardEvent) {
        /*
         * Intentionally left blank
         * The `onClose` fires before `onChooseSuggestion`, so we have to override the `selectSuggestion` which calls both of them
         */
    }

    override onClose() {
        this.resolve(null)
    }

    override selectSuggestion(search: MetaCharacterSearchResult, evt: MouseEvent | KeyboardEvent) {
        this.resolve(search.character);
        super.selectSuggestion(search, evt);
    }
}
