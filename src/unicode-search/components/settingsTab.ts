import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {CharacterService} from "../service/characterService";
import {UserOptionStore} from "../service/userOptionStore";
import {UserOptions} from "../../libraries/types/userOptions";
import {mostRecentlyUsed} from "../../libraries/helpers/mostRecentlyUsed";
import {averageUseCount} from "../../libraries/helpers/averageUseCount";
import {Character} from "../../libraries/types/character";
import {
    UNICODE_CATEGORIES_ALL,
    UnicodeSubcategory,
    UnicodeSubcategoryLetter
} from "../../libraries/types/unicodeCategory";

export class SettingTab extends PluginSettingTab {

    constructor(
        app: App,
        plugin: Plugin,
        private readonly characterService: CharacterService,
        private readonly userOptionStore: UserOptionStore
    ) {
        super(app, plugin);
        this.containerEl.addClass("plugin", "unicode-search", "setting-tab")
    }

    public override async display(): Promise<void> {
        const container = this.containerEl;

        await this.displayFilterSettings(
            container.createDiv({cls: "filter-settings"})
        );

        await this.displayPinSettings(
            container.createDiv({cls: "pin-settings"})
        );
    }

    private async displayFilterSettings(container: HTMLElement) {
        container.createEl(
            "h2",
            {
                text: "Character Filter",
            },
        )

        container.createEl(
            "p",
            {
                text: "Here you can filter the characters that are downloaded and shown in the search prompt."
            }
        )

        for (const category of UNICODE_CATEGORIES_ALL) {
            await SettingTab.addCharacterFilterToggle(container, this.userOptionStore, category);
        }
    }

    private async displayPinSettings(container: HTMLElement) {
        container.createEl(
            "h2",
            {
                text: "Pin Characters",
            },
        )

        container.createEl(
            "p",
            {
                text: "Here you can pin characters, so that they are always showed first when the search prompt is opened."
            }
        )

        // TODO: rework to use the same sorting logic as the search modal

        const pinSectionContainer = container.createDiv({cls: "pin-table"})
        const recentsContainer = pinSectionContainer.createDiv();

        recentsContainer
            .createEl("p")
            .createEl("strong", {text: "Recently Used"});

        const usedCharacters = await this.characterService.getUsed();
        const recentlyUsed = mostRecentlyUsed(usedCharacters);

        for (const character of recentlyUsed) {
            this.addPinCharacterToggle(recentsContainer, character);
        }

        const oftensContainer = pinSectionContainer.createDiv();

        oftensContainer
            .createEl("p")
            .createEl("strong", {text: "Most Often Used"});

        const avgUseCount = averageUseCount(usedCharacters)
        const oftenUsed = usedCharacters.filter(char => char.useCount > avgUseCount)

        for (const character of oftenUsed) {
            this.addPinCharacterToggle(oftensContainer, character);
        }
    }

    private addPinCharacterToggle(container: HTMLElement, character: Character) {
        new Setting(container)
            .setName(character.char)
            .addToggle(input => input
               .setValue(character.pin != null)
               // Weird `this` referencing
               // Here you have to define the `this` argument, otherwise it will call `pin` or `unpin` on `undefined`.
               // .onChange(value => (value ? this.characterService.pin : this.characterService.unpin)(char))
               .onChange(async (value) =>
                   await (value ? this.characterService.pin : this.characterService.unpin).call(this.characterService, character.char)
               )
            );
    }

    private static async addCharacterFilterToggle(
        container: HTMLElement,
        userOptionsStore: UserOptionStore,
        subcategory: UnicodeSubcategory
    ) {
        const curv = await userOptionsStore.getCharacterSubcategory(subcategory)

        new Setting(container)
            .setName(subcategory)
            .addToggle(input => input
               .setValue(curv)
               .onChange((value) => userOptionsStore.setCharacterSubcategory(subcategory, value))
            );
    }

}
