import {type App, type Plugin, PluginSettingTab, Setting} from "obsidian";
import {UNICODE_PLANES_ALL} from "../../libraries/data/unicodePlanes";
import type {UnicodeBlock} from "../../libraries/types/unicode/unicodeBlock";

import {asHexadecimal} from "../../libraries/helpers/asHexadecimal";
import type {CharacterService} from "../service/characterService";
import type {PoolStore} from "../service/poolStore";
import type {CodePointInterval} from "../../libraries/types/codePoint/codePointInterval";
import type {UnicodePlane} from "../../libraries/types/unicode/unicodePlane";
import {UNICODE_CHARACTER_CATEGORIES} from "../../libraries/data/unicodeCharacterCategories";
import type {UnicodeGeneralCategoryGroup} from "../../libraries/types/unicode/unicodeGeneralCategoryGroup";
import type {UnicodeGeneralCategory} from "../../libraries/types/unicode/unicodeGeneralCategory";
import type {DataBootstrapper} from "../service/dataBootstrapper";
import type {FavoriteStore} from "../service/favoriteStore";
import {toHexadecimal} from "../../libraries/helpers/toHexadecimal";
import type {Character, FavoriteCharacter,} from "../../libraries/types/codePoint/character";
import {PickCharacterModal} from "./pickCharacterModal";

export class SettingTab extends PluginSettingTab {
    /* TODO [non-func]: Make settings code easier to comprehend
     * Try using svelte for nicer UI component code.
     * Also, the naming is confusing.
     * Don't forget about the CSS styles too.
     */

    private rendered = false;

    constructor(
        app: App,
        private readonly plugin: Plugin,
        private readonly characterService: CharacterService,
        private readonly favoritesStore: FavoriteStore,
        private readonly poolStore: PoolStore,
        private readonly initializer: DataBootstrapper,
    ) {
        super(app, plugin);
        this.containerEl.addClass("plugin", "unicode-search", "setting-tab");
    }

    override async display(): Promise<void> {
        if (this.rendered) {
            return;
        }

        await this.displayFilterSettings(this.containerEl);
        await this.displayFavoritesSettings(this.containerEl);

        this.rendered = true;
    }

    override async hide(): Promise<void> {
        await this.initializer.initializeData();
        this.containerEl.empty();
        this.rendered = false;
    }

    private async displayFavoritesSettings(container: HTMLElement) {
        new Setting(container)
            .setHeading()
            .setName("Favourite Characters")
            .setDesc(
                "Manage your favourite characters which will be displayed in the plugin's search results. " +
                "You can also enable Quick Insert, making them available as a command in Obsidian.",
            )
            .setClass("group-control")
            .addToggle((toggle) =>
                toggle
                    .setValue(false)
                    .onChange((visible) =>
                        manageFavoritesContainer.toggleClass("hidden", !visible),
                    ),
            );

        const favorites = await this.characterService.getFavorites();

        const manageFavoritesContainer = container.createDiv({
            cls: ["group-container", "hidden"],
        });
        const itemContainer = manageFavoritesContainer.createDiv({
            cls: ["item-container"],
        });
        const newCharacterList = itemContainer.createDiv({
            cls: ["character-list", "new"],
        });
        const characterList = itemContainer.createDiv({
            cls: ["character-list", "no-first"],
        });

        new Setting(newCharacterList)
            .setName("")
            .setDesc("Add a new favourite character")
            .addButton((btn) => {
                btn.setIcon("plus");
                btn.onClick(async (_) => {
                    const char = await PickCharacterModal.open(
                        this.plugin.app,
                        this.characterService,
                    );

                    if (char == null) {
                        return;
                    }

                    const isAlreadyFavorite = favorites.some((fav) => fav.id === char.id);
                    if (isAlreadyFavorite) {
                        return;
                    }

                    const favorite = await this.favoritesStore.addFavorite(char.id);
                    const favoriteChar = {...favorite, ...char};
                    this.displayFavoriteChar(newCharacterList, favoriteChar);
                });
            });

        for (const character of favorites) {
            this.displayFavoriteChar(characterList, character);
        }
    }

    private displayFavoriteChar(
        container: HTMLElement,
        character: FavoriteCharacter,
    ) {
        const setting = new Setting(container);

        setting
            .setClass("favorite-control")
            .setName(character.glyph)
            .setDesc(character.name)
            .addToggle((toggle) =>
                toggle
                    .setTooltip("Enable Quick Insert command in Obsidian")
                    .setValue(character.quickInsertEnabled)
                    .onChange((enabled) => this.toggleHotkeyCommand(character, enabled)),
            )
            .addButton((button) =>
                button
                    .setIcon("trash")
                    .setTooltip("Remove from favourites")
                    .onClick(() => {
                        setting.settingEl.hide();
                        return this.favoritesStore.removeFavorite(character.id);
                    }),
            );
    }

    private async toggleHotkeyCommand(
        character: Character,
        enabled: boolean,
    ): Promise<void> {
        const insertCharId = `insert-${toHexadecimal(character)}`;

        if (enabled) {
            this.plugin.addCommand({
                id: insertCharId,
                name: `Insert '${character.glyph}'`,
                editorCallback: (editor) => {
                    editor.replaceSelection(character.glyph);
                    return true;
                },
            });
        } else {
            this.plugin.removeCommand(insertCharId);
        }

        await this.favoritesStore.update(character.id, () => ({
            quickInsertEnabled: enabled,
        }));
    }

    private async displayFilterSettings(container: HTMLElement) {
        new Setting(container)
            .setHeading()
            .setName("Character Pool")
            .setDesc(
                "Configure which Unicode characters are included in your search. " +
                "Toggle the headings to display the options.",
            );

        new Setting(container)
            .setName("General Categories")
            .setClass("group-control")
            .addToggle((toggle) =>
                toggle
                    .setValue(false)
                    .onChange((visible) =>
                        categoryFilterDiv.toggleClass("hidden", !visible),
                    ),
            );

        const categoryFilterDiv = container.createDiv({
            cls: ["group-container", "hidden"],
        });

        for (const category of UNICODE_CHARACTER_CATEGORIES) {
            await this.addCharacterCategoryFilter(categoryFilterDiv, category);
        }

        new Setting(container)
            .setName("Planes and Blocks")
            .setClass("group-control")
            .addToggle((toggle) =>
                toggle
                    .setValue(false)
                    .onChange((visible) =>
                        planesFilterDiv.toggleClass("hidden", !visible),
                    ),
            );

        const planesFilterDiv = container.createDiv({
            cls: ["group-container", "hidden"],
        });

        for (const plane of UNICODE_PLANES_ALL) {
            await this.addCharacterPlaneFilters(planesFilterDiv, plane);
        }
    }

    private async addCharacterCategoryFilter(
        container: HTMLElement,
        categoryGroup: UnicodeGeneralCategoryGroup,
    ) {
        const categoryGroupContainer = container.createDiv({
            cls: "item-container",
        });

        new Setting(categoryGroupContainer)
            .setHeading()
            .setName(categoryGroup.name);

        const categoryContainer = categoryGroupContainer.createDiv({
            cls: "items-list",
        });

        for (const category of categoryGroup.categories) {
            await SettingTab.addCharacterCategoryFilterToggle(
                categoryContainer,
                this.poolStore,
                category,
            );
        }
    }

    private async addCharacterPlaneFilters(
        container: HTMLElement,
        plane: UnicodePlane,
    ) {
        const planeContainer = container.createDiv({cls: "item-container"});

        new Setting(planeContainer)
            .setHeading()
            .setClass("codePoint-interval")
            .setName(
                createFragment((fragment) => {
                    fragment.createSpan().appendText(plane.description);
                    SettingTab.codePointFragment(fragment, plane.interval);
                }),
            );

        const blocksContainer = planeContainer.createDiv({cls: "blocks-list"});

        for (const block of plane.blocks) {
            await SettingTab.addCharacterBlockFilterToggle(
                blocksContainer,
                this.poolStore,
                block,
            );
        }
    }

    private static async addCharacterBlockFilterToggle(
        container: HTMLElement,
        options: PoolStore,
        block: UnicodeBlock,
    ) {
        /* Low: try to redo more effectively, we always get a plane worth of blocks */
        const blockIncluded = await options.getCharacterBlock(block.interval);

        new Setting(container)
            .setName(block.description)
            .setDesc(
                createFragment((fragment) =>
                    SettingTab.codePointFragment(fragment, block.interval),
                ),
            )
            .addToggle((input) =>
                input
                    .setValue(blockIncluded)
                    .onChange((value) =>
                        options.setCharacterBlock(block.interval, value),
                    ),
            );
    }

    private static async addCharacterCategoryFilterToggle(
        container: HTMLElement,
        options: PoolStore,
        category: UnicodeGeneralCategory,
    ) {
        /* Low: try to redo more effectively, we always get a plane worth of blocks */
        const blockIncluded = await options.getCharacterCategory(
            category.abbreviation,
        );

        new Setting(container)
            .setName(category.name)
            .setDesc(category.description)
            .addToggle((input) =>
                input
                    .setValue(blockIncluded)
                    .onChange((value) =>
                        options.setCharacterCategory(category.abbreviation, value),
                    ),
            );
    }

    private static codePointFragment(
        parent: DocumentFragment,
        interval: CodePointInterval,
    ): DocumentFragment {
        parent
            .createSpan({cls: ["character-code-point", "monospace"]})
            .setText(
                `${asHexadecimal(interval.start)}－${asHexadecimal(interval.end)}`,
            );

        return parent;
    }
}
