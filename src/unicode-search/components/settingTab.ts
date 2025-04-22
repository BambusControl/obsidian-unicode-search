import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {UNICODE_PLANES_ALL} from "../../libraries/data/unicodePlanes";
import {UnicodeBlock} from "../../libraries/types/unicode/unicodeBlock";

import {asHexadecimal} from "../../libraries/helpers/asHexadecimal";
import {CharacterService} from "../service/characterService";
import {FilterStore} from "../service/filterStore";
import {CodepointInterval} from "../../libraries/types/codepoint/codepointInterval";
import {UnicodePlane} from "../../libraries/types/unicode/unicodePlane";
import {UNICODE_CHARACTER_CATEGORIES} from "../../libraries/data/unicodeCharacterCategories";
import {UnicodeGeneralCategoryGroup} from "../../libraries/types/unicode/unicodeGeneralCategoryGroup";
import {UnicodeGeneralCategory} from "../../libraries/types/unicode/unicodeGeneralCategory";
import {DataManager} from "../service/dataManager";
import {FavoritesStore} from "../service/favoritesStore";
import {toHexadecimal} from "../../libraries/helpers/toHexadecimal";
import {Character, FavoriteCharacter} from "../../libraries/types/codepoint/character";
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
        private readonly favoritesStore: FavoritesStore,
        private readonly settingsStore: FilterStore,
        private readonly initializer: DataManager,
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
            .setName("Favorite Characters")
            .setDesc(
                "Manage your favorite characters which will be displayed in the plugin's search results. " +
                "You can also enable them as a hotkey, making them available as a command in Obsidian."
            )
            .setClass("group-control")
            .addToggle(toggle => toggle
                .setValue(false)
                .onChange(visible => manageFavoritesContainer.toggleClass("hidden", !visible))
            )
        ;

        const favorites = await this.characterService.getFavorites();

        const manageFavoritesContainer = container.createDiv({cls: ["group-container", "hidden"]});
        const itemContainer = manageFavoritesContainer.createDiv({cls: ["item-container"]});
        const newCharacterList = itemContainer.createDiv({cls: ["character-list", "new"]});
        const characterList = itemContainer.createDiv({cls: ["character-list", "no-first"]});

        new Setting(newCharacterList)
            .setName("")
            .setDesc("Add a new favorite character")
            .addButton(btn => {
                btn.setIcon("plus")
                btn.onClick(async _ => {
                    const char = await PickCharacterModal.open(this.plugin.app, this.characterService);

                    if (char == null) {
                        return;
                    }

                    const isAlreadyFavorite = favorites.some(fav => fav.codepoint === char.codepoint);
                    if (isAlreadyFavorite) {
                        return;
                    }

                    const favorite = await this.favoritesStore.addFavorite(char.codepoint);
                    const favoriteChar = {...favorite, ...char};
                    this.displayFavoriteChar(newCharacterList, favoriteChar)
                })
            })
        ;

        for (const character of favorites) {
            this.displayFavoriteChar(characterList, character);
        }
    }

    private displayFavoriteChar(container: HTMLElement, character: FavoriteCharacter) {
        const setting = new Setting(container);

        setting
            .setClass("favorite-control")
            .setName(character.codepoint)
            .setDesc(character.name)
            .addToggle(toggle => toggle
                .setTooltip("Add insert command to Obsidian")
                .setValue(character.hotkey)
                .onChange(enabled => this.toggleHotkeyCommand(character, enabled))
            )
            .addButton(button => button
                .setIcon("trash")
                .setTooltip("Remove from favorites")
                .onClick(() => {
                    setting.settingEl.hide()
                    return this.favoritesStore.removeFavorite(character.codepoint);
                })
            )
        ;
    }

    private async toggleHotkeyCommand(character: Character, enabled: boolean): Promise<void> {
        const insertCharId = `insert-${toHexadecimal(character)}`;

        if (enabled) {
            this.plugin.addCommand({
                id: insertCharId,
                name: `Insert '${character.codepoint}'`,
                editorCallback: editor => {
                    editor.replaceSelection(character.codepoint);
                    return true;
                },
            })
        } else {
            this.plugin.removeCommand(insertCharId);
        }

        await this.favoritesStore.update(character.codepoint, () => ({hotkey: enabled}));
    }

    private async displayFilterSettings(container: HTMLElement) {
        new Setting(container)
            .setHeading()
            .setName("Unicode Character Filters")
            .setDesc(
                "Here you can set which characters would you like to be included " +
                "or excluded from the plugins search results. " +
                "Toggle the headings to display the options."
            )
        ;

        new Setting(container)
            .setName("General Categories")
            .setClass("group-control")
            .addToggle(toggle => toggle
                .setValue(false)
                .onChange(visible => categoryFilterDiv.toggleClass("hidden", !visible))
            )
        ;

        const categoryFilterDiv = container.createDiv({cls: ["group-container", "hidden"]});

        for (const category of UNICODE_CHARACTER_CATEGORIES) {
            await this.addCharacterCategoryFilter(categoryFilterDiv, category);
        }

        new Setting(container)
            .setName("Planes and Blocks")
            .setClass("group-control")
            .addToggle(toggle => toggle
                .setValue(false)
                .onChange(visible => planesFilterDiv.toggleClass("hidden", !visible))
            )
        ;

        const planesFilterDiv = container.createDiv({cls: ["group-container", "hidden"]});

        for (const plane of UNICODE_PLANES_ALL) {
            await this.addCharacterPlaneFilters(planesFilterDiv, plane);
        }
    }

    private async addCharacterCategoryFilter(container: HTMLElement, categoryGroup: UnicodeGeneralCategoryGroup) {
        const categoryGroupContainer = container.createDiv({cls: "item-container"});

        new Setting(categoryGroupContainer)
            .setHeading()
            .setName(categoryGroup.name)
        ;

        const categoryContainer = categoryGroupContainer.createDiv({cls: "items-list"});

        for (const category of categoryGroup.categories) {
            await SettingTab.addCharacterCategoryFilterToggle(categoryContainer, this.settingsStore, category);
        }
    }

    private async addCharacterPlaneFilters(container: HTMLElement, plane: UnicodePlane) {
        const planeContainer = container.createDiv({cls: "item-container"});

        new Setting(planeContainer)
            .setHeading()
            .setClass("codepoint-interval")
            .setName(createFragment(fragment => {
                fragment.createSpan().appendText(plane.description);
                SettingTab.codepointFragment(fragment, plane.interval)
            }))
        ;

        const blocksContainer = planeContainer.createDiv({cls: "blocks-list"});

        for (const block of plane.blocks) {
            await SettingTab.addCharacterBlockFilterToggle(blocksContainer, this.settingsStore, block);
        }
    }

    private static async addCharacterBlockFilterToggle(
        container: HTMLElement,
        options: FilterStore,
        block: UnicodeBlock
    ) {
        /* Low: try to redo more effectively, we always get a plane worth of blocks */
        const blockIncluded = await options.getCharacterBlock(block.interval);

        new Setting(container)
            .setName(block.description)
            .setDesc(createFragment(fragment => SettingTab.codepointFragment(fragment, block.interval)))
            .addToggle(input => input
                .setValue(blockIncluded)
                .onChange((value) => options.setCharacterBlock(block.interval, value))
            );
    }

    private static async addCharacterCategoryFilterToggle(
        container: HTMLElement,
        options: FilterStore,
        category: UnicodeGeneralCategory
    ) {
        /* Low: try to redo more effectively, we always get a plane worth of blocks */
        const blockIncluded = await options.getCharacterCategory(category.abbreviation);

        new Setting(container)
            .setName(category.name)
            .setDesc(category.description)
            .addToggle(input => input
                .setValue(blockIncluded)
                .onChange((value) => options.setCharacterCategory(category.abbreviation, value))
            );
    }

    private static codepointFragment(parent: DocumentFragment, interval: CodepointInterval): DocumentFragment {
        parent
            .createSpan({cls: ["character-codepoint", "monospace"],})
            .setText(`${asHexadecimal(interval.start)}－${asHexadecimal(interval.end)}`);

        return parent;
    }

}
