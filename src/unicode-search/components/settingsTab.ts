import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {CharacterService} from "../service/characterService";
import {UserOptionStore} from "../service/userOptionStore";
import {UserOptions} from "../../libraries/types/userOptions";
import {mostRecentlyUsed} from "../../libraries/helpers/mostRecentlyUsed";
import {averageUseCount} from "../../libraries/helpers/averageUseCount";
import {CharacterKey} from "../../libraries/types/character";

export class SettingTab extends PluginSettingTab {

    private userOptions: UserOptions | null = null

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
        this.userOptions = await this.userOptionStore.fetchUserOptions();
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
        const recentsContainer = pinSectionContainer.createDiv();

        recentsContainer
            .createEl("p")
            .createEl("strong", { text: "Recently Used" });

        const usedCharacters = await this.characterService.getUsed();
        const recentlyUsed = mostRecentlyUsed(usedCharacters);

        for (const character of recentlyUsed) {
            this.addPinCharacterToggle(recentsContainer, character.char);
        }

        const oftensContainer = pinSectionContainer.createDiv();

        oftensContainer
            .createEl("p")
            .createEl("strong", { text: "Most Often Used" });

        const avgUseCount = averageUseCount(usedCharacters)
        const oftenUsed = usedCharacters.filter(char => char.useCount > avgUseCount)

        for (const character of oftenUsed) {
            this.addPinCharacterToggle(oftensContainer, character.char);
        }
    }

    public override async hide(): Promise<void> {
        if (this.userOptions == null) {
            return;
        }

        await this.userOptionStore.exportUserOptions(this.userOptions);
        this.containerEl.empty();
    }

    private addPinCharacterToggle(container: HTMLElement, char: CharacterKey) {
        new Setting(container)
            .setName(char)
            .addToggle(input => input
               .setValue(this.characterService.get(char) != null)
               .onChange(value => (value ? this.characterService.pin : this.characterService.unpin)(char))
            )
    }

}
