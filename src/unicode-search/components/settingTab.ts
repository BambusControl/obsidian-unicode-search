import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {UNICODE_PLANES_ALL} from "../../libraries/data/unicodePlanes";
import {UnicodeBlock} from "../../libraries/types/unicodeBlock";

import {asHexadecimal} from "../../libraries/helpers/asHexadecimal";
import {CharacterService} from "../service/characterService";
import {SettingsStore} from "../service/settingsStore";

export class SettingTab extends PluginSettingTab {

    constructor(
        app: App,
        plugin: Plugin,
        private readonly characterService: CharacterService,
        private readonly settingsStore: SettingsStore
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
                await SettingTab.addCharacterBlockFilterToggle(blocksContainer, this.settingsStore, block);
            }
        }
    }

    private static async addCharacterBlockFilterToggle(
        container: HTMLElement,
        options: SettingsStore,
        block: UnicodeBlock
    ) {
        /* Low: try to redo more effectively, we always get a plane worth of blocks */
        const blockIncluded = await options.getCharacterBlock(block.interval.start)

        new Setting(container)
            .setName(block.description)
            .setDesc(`[${asHexadecimal(block.interval.start)}..${asHexadecimal(block.interval.end)}]`)
            .addToggle(input => input
               .setValue(blockIncluded)
               .onChange((value) => options.setCharacterBlock(block.interval.start, value))
            );
    }

}
