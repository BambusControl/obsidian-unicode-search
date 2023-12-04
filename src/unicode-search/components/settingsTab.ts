import {App, Plugin, PluginSettingTab} from "obsidian";
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
        const userOptions = this.userOptionStore.getUserOptions()

        const element = this.containerEl;
        element.createEl(
            "h2",
            {
                // cls: "",
                text: "Unicode Search",
            },
        )
    }

}
