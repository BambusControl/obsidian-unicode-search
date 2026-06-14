import {Plugin} from "obsidian";
import {FavoritesStore} from "./favoritesStore";
import {toHexadecimal} from "../../libraries/helpers/toHexadecimal";
import {CharacterService} from "./characterService";
import {InsertCharacterModal} from "../components/insertCharacterModal";
import {CodepointKey} from "../../libraries/types/codepoint/unicode";
import {toLiteral} from "../../libraries/helpers/toLiteral";

export class Commander {
    constructor(
        private readonly plugin: Plugin,
    ) {
    }

    addModal(characters: CharacterService) {
        this.plugin.addCommand({
            id: "search-unicode-chars",
            name: "Search Unicode characters",

            editorCallback: editor => {
                const modal = new InsertCharacterModal(
                    this.plugin.app,
                    characters,
                    editor,
                );
                modal.open();
                return true;
            },
        });
    }

    async addFavorites(favorites: FavoritesStore) {
        const hotkeys = (await favorites.getFavorites())
            .filter(favorite => favorite.hotkey);

        for (const character of hotkeys) {
            this.addCommandFor(character);
        }
    }

    private addCommandFor(character: CodepointKey) {
        const literal = toLiteral(character.id)

        this.plugin.addCommand({
            id: `insert-${toHexadecimal(character)}`,
            name: `Insert '${literal}'`,
            repeatable: true,

            editorCallback: editor => {
                editor.replaceSelection(literal);
            },
        })
    }
}
