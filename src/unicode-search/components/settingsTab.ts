import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {CharacterStore} from "../service/characterStore";
import {UserOptionStore} from "../service/userOptionStore";
import {UserOptions} from "../../libraries/types/userOptions";
import {mostRecentlyUsed} from "../../libraries/helpers/mostRecentlyUsed";
import {averageUseCount} from "../../libraries/helpers/averageUseCount";
import {Character, CharacterKeyType} from "../../libraries/types/character";
import {UsageInfo} from "../../libraries/types/usageInfo";

export class SettingTab extends PluginSettingTab {

    private userOptions: UserOptions | null = null

    constructor(
        app: App,
        plugin: Plugin,
        private readonly characterStore: CharacterStore,
        private readonly userOptionStore: UserOptionStore
    ) {
        super(app, plugin);
        this.containerEl.addClass("plugin", "unicode-search", "setting-tab")
    }

    public override async display(): Promise<void> {
        this.userOptions = await this.userOptionStore.fetchUserOptions();
        const options = this.userOptions;
        const characters = await this.characterStore.fetchAll();

        const container = this.containerEl;

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
        const pinnedContainer = pinSectionContainer.createDiv();

        pinnedContainer
            .createEl("p")
            .createEl("strong", { text: "Pinned Previously" });

        for (const character of options.pinned) {
            SettingTab.addPinCharacterToggle(pinnedContainer, character, options);
        }

        const recentsContainer = pinSectionContainer.createDiv();

        recentsContainer
            .createEl("p")
            .createEl("strong", { text: "Recently Used" });

        // TODO: Used characters code duplicate
        const usedCharacters = characters
            .filter(char => char.useCount != null && char.lastUsed != null)
            .map(char => char as (Character & UsageInfo));

        const recentlyUsed = mostRecentlyUsed(usedCharacters);

        for (const character of recentlyUsed) {
            SettingTab.addPinCharacterToggle(recentsContainer, character.char, options);
        }

        const oftensContainer = pinSectionContainer.createDiv();

        oftensContainer
            .createEl("p")
            .createEl("strong", { text: "Most Often Used" });

        const avgUseCount = averageUseCount(usedCharacters)
        const oftenUsed = usedCharacters.filter(char => char.useCount > avgUseCount)

        for (const character of oftenUsed) {
            SettingTab.addPinCharacterToggle(oftensContainer, character.char, options);
        }
    }

    public override async hide(): Promise<void> {
        if (this.userOptions == null) {
            return;
        }

        await this.userOptionStore.exportUserOptions(this.userOptions);
        this.containerEl.empty();
    }

    private static addPinCharacterToggle(container: HTMLElement, char: CharacterKeyType, userOptions: UserOptions) {
        new Setting(container)
            .setName(char)
            .addToggle(input => input
                .setValue(userOptions.pinned.some(item => item === char))
                .onChange(value => userOptions.pinned.push(char))
            )
    }

}
