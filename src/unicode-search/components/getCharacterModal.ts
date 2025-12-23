import {FuzzySearchModal} from "./fuzzySearchModal";
import {App} from "obsidian";
import {CharacterService} from "../service/characterService";
import {INSERT_CHAR_INSTRUCTION} from "./visualElements";
import {MetaCharacterSearchResult} from "./characterSearch";

export class GetCharacterModal extends FuzzySearchModal {
    constructor(
        app: App,
        characterService: CharacterService,
        private readonly callback: (result: MetaCharacterSearchResult) => void
    ) {
        super(app, characterService, INSERT_CHAR_INSTRUCTION);
    }

    override onChooseSuggestion(search: MetaCharacterSearchResult, _: MouseEvent | KeyboardEvent): void {
        this.callback(search.character)
    }

}
