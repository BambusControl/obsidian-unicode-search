import {App, Editor} from "obsidian";
import {MetaCharacterSearchResult} from "./characterSearch";
import {CharacterService} from "../service/characterService";
import {INSERT_CHAR_INSTRUCTION} from "./visualElements";
import {FuzzySearchModal} from "./fuzzySearchModal";

export class InsertCharacterModal extends FuzzySearchModal {
    public constructor(
        app: App,
        characterService: CharacterService,
        private readonly editor: Editor,
    ) {
        super(app, characterService, INSERT_CHAR_INSTRUCTION);
    }

    public override async onChooseSuggestion(search: MetaCharacterSearchResult, evt: MouseEvent | KeyboardEvent): Promise<void> {
        this.editor.replaceSelection(search.character.codepoint);

        try {
            /* super.characterService here throws an undefined exception (super is undefined) */
            await this.characterService.recordUsage(search.character.codepoint);
        } catch (error) {
            console.error("Failed to record character usage", {err: error});
        }
    }

}
