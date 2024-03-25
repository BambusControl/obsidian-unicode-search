import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {CharacterService} from "../service/characterService";
import {OptionsStore} from "../service/optionsStore";
import {mostRecentlyUsed} from "../../libraries/helpers/mostRecentlyUsed";
import {averageUseCount} from "../../libraries/helpers/averageUseCount";
import {Character} from "../../libraries/types/character";
import {UNICODE_PLANES_ALL} from "../../libraries/data/unicodePlanes";
import {UnicodeBlock} from "../../libraries/types/unicodeBlock";

import {asHexadecimal} from "../../libraries/helpers/asHexadecimal";

export class SettingTab extends PluginSettingTab {

    constructor(
        app: App,
        plugin: Plugin,
        private readonly characterService: CharacterService,
        private readonly userOptionStore: OptionsStore
    ) {
        super(app, plugin);
        this.containerEl.addClass("plugin", "unicode-search", "setting-tab")
    }

    public override async display(): Promise<void> {
        const container = this.containerEl;

        await this.displayFilterSettings(
            container.createDiv({cls: "filter-settings"})
        );
    }

    private async displayFilterSettings(container: HTMLElement) {
        new Setting(container)
            .setHeading()
            .setName("Character Filter")
            .setDesc("Here you can filter the characters that are downloaded and shown in the search prompt.")
        ;

        const planesContainer = container.createDiv()

        for (const plane of UNICODE_PLANES_ALL) {
            const planeContainer = planesContainer.createDiv("plane-container");

            new Setting(planeContainer)
                .setHeading()
                .setName(`${plane.planeNumber}: ${plane.abbreviation}`)
                .setDesc(createFragment(fragment => {
                    fragment.appendText(plane.description)
                    fragment.createEl("br")
                    fragment.appendText(`[${asHexadecimal(plane.interval.start)}..${asHexadecimal(plane.interval.end)}]`)
                }))
            ;

            const blocksContainer = planeContainer.createDiv({cls: "blocks-grid"});

            for (const block of plane.blocks) {
                await SettingTab.addCharacterBlockFilterToggle(blocksContainer, this.userOptionStore, block);
            }
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

    private static async addCharacterBlockFilterToggle(
        container: HTMLElement,
        userOptionsStore: OptionsStore,
        block: UnicodeBlock
    ) {
        /* Low: try to redo more effectively, we always get a plane worth of blocks */
        const blockIncluded = await userOptionsStore.getCharacterBlock(block.interval.start)

        new Setting(container)
            .setName(block.description)
            .setDesc(`[${asHexadecimal(block.interval.start)}..${asHexadecimal(block.interval.end)}]`)
            .addToggle(input => input
               .setValue(blockIncluded)
               .onChange((value) => userOptionsStore.setCharacterBlock(block.interval.start, value))
            );
    }

}
