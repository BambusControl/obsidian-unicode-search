import {PluginSettingTab} from "obsidian";

export class SettingTab extends PluginSettingTab {

    public override display(): void {
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
