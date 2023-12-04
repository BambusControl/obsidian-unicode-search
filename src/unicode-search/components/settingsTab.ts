import {App, Plugin, PluginSettingTab, Setting} from "obsidian";
import {CharacterStore} from "../service/characterStore";
import {UserOptionStore} from "../service/userOptionStore";

export class SettingTab extends PluginSettingTab {


    constructor(
        app: App,
        plugin: Plugin,
        private readonly characterStore: CharacterStore,
        private readonly userOptionStore: UserOptionStore
    ) {
        super(app, plugin);
    }

    public override async display(): Promise<void> {
        const userOptions = await this.userOptionStore.fetchUserOptions()

        const element = this.containerEl;
        element.createEl(
            "h2",
            {
                // cls: "",
                text: "Unicode Search",
            },
        )

        for (const char of userOptions.pinned) {
            new Setting(element)
            .setName("pin")
            .setDesc("pin yo character")
            // .addToggle(input => {})
            .addText(input => {
                input.setValue(char)
                    .setPlaceholder(char)
                    .onChange(value => {
                    const pinned = userOptions.pinned
                    pinned.push(value)
                    this.userOptionStore.exportUserOptions(userOptions).then()
                })
            })
        }

        new Setting(element)
            .setName("pin")
            .setDesc("pin yo character")
            // .addToggle(input => {})
            .addText(input => {
                input.onChange(value => {
                    const pinned = userOptions.pinned
                    pinned.push(value)
                    this.userOptionStore.exportUserOptions(userOptions).then()
                })
            })
    }

}
