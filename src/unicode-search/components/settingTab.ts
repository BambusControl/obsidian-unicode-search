import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {UNICODE_PLANES_ALL} from "../../libraries/data/unicodePlanes";
import {UnicodeBlock} from "../../libraries/types/unicode/unicodeBlock";

import {asHexadecimal} from "../../libraries/helpers/asHexadecimal";
import {CharacterService} from "../service/characterService";
import {SettingsStore} from "../service/settingsStore";
import {CodepointInterval} from "../../libraries/types/codepoint/codepointInterval";
import {UnicodePlane} from "../../libraries/types/unicode/unicodePlane";
import {UNICODE_CHARACTER_CATEGORIES} from "../../libraries/data/unicodeCharacterCategories";
import {UnicodeGeneralCategoryGroup} from "../../libraries/types/unicode/unicodeGeneralCategoryGroup";
import {UnicodeGeneralCategory} from "../../libraries/types/unicode/unicodeGeneralCategory";
import {DataInitializer} from "../service/dataInitializer";
import {FavoritesStore} from "../service/favoritesStore";
import {toHexadecimal} from "../../libraries/helpers/toHexadecimal";
import {Character} from "../../libraries/types/codepoint/character";
import {mostRecentUses} from "../../libraries/helpers/mostRecentUses";
import {averageUseCount} from "../../libraries/helpers/averageUseCount";
import {UsageDisplayStatistics} from "../../libraries/types/usageDisplayStatistics";
import {compareUsedCharacters} from "../../libraries/comparison/compareUsedCharacters";

export class SettingTab extends PluginSettingTab {

    private rendered = false;

    constructor(
        app: App,
        private readonly plugin: Plugin,
        private readonly characterService: CharacterService,
        private readonly favoritesStore: FavoritesStore,
        private readonly settingsStore: SettingsStore,
        private readonly initializer: DataInitializer,
    ) {
        super(app, plugin);
        this.containerEl.addClass("plugin", "unicode-search", "setting-tab");
    }

    override async display(): Promise<void> {
        if (this.rendered) {
            return;
        }

        const container = this.containerEl.createDiv({cls: "filter-settings"});

        await this.displayFavoritesSettings(container);
        await this.displayFilterSettings(container);

        this.rendered = true;
    }

    override hide(): Promise<void> {
        return this.initializer.initializeData();
    }

    private async displayFavoritesSettings(container: HTMLElement) {
        /* TODO next: Split favorites into two sections: 1) for adding, and 2) for managing */
        new Setting(container)
            .setHeading()
            .setName("Manage Favorite Characters")
            .setDesc(
                "Select your favorite characters to be displayed in the plugin's search results"
            )
        ;

        const favorites = await this.characterService.getFavorites();

        for (const character of favorites) {
            const setting = new Setting(container);

            setting
                .setName(character.codepoint)
                .setDesc(character.added.toDateString())
                .addToggle(toggle => toggle
                    .setValue(character.hotkey)
                    .onChange(enabled => this.toggleHotkeyCommand(character, enabled))
                )
                .addButton(button => button
                    .setTooltip("Remove from favorites")
                    .setIcon("trash")
                    .onClick(async () => {
                        await this.favoritesStore.removeFavorite(character.codepoint);
                        setting.settingEl.hide()
                    })
                )
            ;
        }

        /* TODO: extract usage statistics calculation from search modal and favorites management */
        const usedCharacters = await this.characterService.getUsed();
        const usageStats = {
            topThirdRecentlyUsed: mostRecentUses(usedCharacters).slice(0, 3).last() ?? new Date(0),
            averageUseCount: averageUseCount(usedCharacters),
        } as UsageDisplayStatistics;

        const suggestions = usedCharacters
            .filter(suggestion => !favorites.some(favorite => favorite.codepoint === suggestion.codepoint))
            .sort((l, r) => compareUsedCharacters(l, r, usageStats.topThirdRecentlyUsed))
            .slice(0, 4)
        ;

        for (const character of suggestions) {
            const setting = new Setting(container);

            setting
                .setName(character.codepoint)
                // .setDesc(character.added.toDateString())
                .addToggle(toggle => toggle
                    .setDisabled(true)
                    // .setValue(character.hotkey)
                    // .onChange(enabled => this.toggleHotkeyCommand(character, enabled))
                )
                .addButton(button => button
                    .setTooltip("Add to favorites")
                    .setIcon("star")
                    .onClick(async () => {
                        await this.favoritesStore.addFavorite(character.codepoint);
                        // setting.settingEl.hide();
                    })
                )
            ;
        }

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
        options: SettingsStore,
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
        options: SettingsStore,
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
