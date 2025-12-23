import {App} from "obsidian";
import {CharacterService} from "./service/characterService";
import {GetCharacterModal} from "./components/getCharacterModal";
import {MetaCharacterSearchResult} from "./components/characterSearch";

export class LinkUpApi {
    constructor(
        private readonly characterService: CharacterService,
    ) {
    }

    askForCharacter(app: App, callback: (result: MetaCharacterSearchResult) => void) {
        const modal = new GetCharacterModal(app, this.characterService, callback);
        modal.open();
    }

}
