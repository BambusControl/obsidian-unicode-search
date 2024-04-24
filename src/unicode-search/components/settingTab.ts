import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {UNICODE_PLANES_ALL} from "../../libraries/data/unicodePlanes";
import {UnicodeBlock} from "../../libraries/types/unicodeBlock";

import {asHexadecimal} from "../../libraries/helpers/asHexadecimal";
import {CharacterService} from "../service/characterService";
import {SettingsStore} from "../service/settingsStore";
import {UnicodeSearchError} from "../errors/unicodeSearchError";
import {CodepointInterval} from "../../libraries/types/codepoint/codepointInterval";
import {UnicodePlane} from "../../libraries/types/unicodePlane";

export class SettingTab extends PluginSettingTab {

    private rendered = false;

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
        if (this.rendered) {
            return;
        }

        const container = this.containerEl.createDiv({cls: "filter-settings"});
        await this.displayFilterSettings(container);

        this.rendered = true;
    }

    private async displayFilterSettings(container: HTMLElement) {
        new Setting(container)
            .setHeading()
            .setName("Character Filter")
            .setDesc("Here you can filter the characters that are downloaded and shown in the search prompt.");

        const planesContainer = container.createDiv({cls: "planes-container"})

        for (const plane of UNICODE_PLANES_ALL) {
            await this.addCharacterPlaneFilters(planesContainer, plane);
        }
    }

    private async addCharacterPlaneFilters(container: HTMLElement, plane: UnicodePlane) {
        const planeContainer = container.createDiv({cls: "plane-container"});

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
        const blockIncluded = await options.getCharacterBlock(block.interval.start)

        new Setting(container)
            .setName(block.description)
            .setDesc(createFragment(fragment => SettingTab.codepointFragment(fragment, block.interval)))
            .addToggle(input => input
                .setValue(blockIncluded)
                .onChange((value) => options.setCharacterBlock(block.interval.start, value))
            );
    }

    private static codepointFragment(parent: DocumentFragment, interval: CodepointInterval): DocumentFragment {
        parent
            .createSpan({cls: "character-codepoint",})
            .setText(`${asHexadecimal(interval.start)}－${asHexadecimal(interval.end)}`)

        return parent;
    }

}
