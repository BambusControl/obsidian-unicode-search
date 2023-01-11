import {App, PluginSettingTab, Setting} from "obsidian";
import UnicodeSearchPlugin from "./main";

export class SampleSettingTab extends PluginSettingTab {
	plugin: UnicodeSearchPlugin;

	public constructor(app: App, plugin: UnicodeSearchPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	public display(): void {
		const {containerEl}: this = this;

		containerEl.empty();

		containerEl.createEl("h2", {text: "Settings for my awesome plugin."});

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText(text => text
				.setPlaceholder("Enter your secret")
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value: string): Promise<void> => {
					console.log("Secret: " + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
