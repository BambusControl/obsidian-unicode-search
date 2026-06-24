import type {Plugin} from "obsidian";
import type {FavoriteStore} from "./favoriteStore";
import {toHexadecimal} from "../../libraries/helpers/toHexadecimal";
import type {CharacterService} from "./characterService";
import {InsertCharacterModal} from "../components/insertCharacterModal";
import type {Character} from "../../libraries/types/codePoint/unicode";

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

    async addFavorites(favorites: FavoriteStore, characters: CharacterService) {
        const quickInsertEnableds = (await favorites.getFavorites())
            .filter(favorite => favorite.quickInsertEnabled);

        for (const favorite of quickInsertEnableds) {
            const character = await characters.getOne(favorite.id);
            this.addCommandFor(character);
        }
    }

    private addCommandFor(character: Character) {
        this.plugin.addCommand({
            id: `insert-${toHexadecimal(character)}`,
            name: `Insert '${character.glyph}'`,
            repeatable: true,

            editorCallback: editor => {
                editor.replaceSelection(character.glyph);
            },
        })
    }
}
