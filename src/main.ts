import {App, Notice, Plugin, PluginManifest} from "obsidian";
import {SampleSettingTab} from "./sample-setting.tab";
import {UnicodeSearchPluginSettings} from "./unicode-search-plugin.settings";
import {DEFAULT_SETTINGS} from "./config";
import {UniModal} from "./uni.modal";
import {UnicodeCharacterService} from "./unicode-character.service";

export default class UnicodeSearchPlugin extends Plugin {
	public settings: UnicodeSearchPluginSettings;

	public constructor(app: App, manifest: PluginManifest, settings: UnicodeSearchPluginSettings) {
		super(app, manifest);
		this.settings = settings;
	}

	public override async onload(): Promise<void> {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl: HTMLElement = this.addRibbonIcon("dice", "Sample Plugin", () => {
			// Called when the user clicks the icon.
			return new Notice("This is a new notice!");
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass("my-plugin-ribbon-class");

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl: HTMLElement = this.addStatusBarItem();
		statusBarItemEl.setText("Status Bar Text");

		this.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = new UniModal(this.app, editor, new UnicodeCharacterService());
				modal.open();
				return true;
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, "click", (evt: MouseEvent): void => {
			console.log("click", evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval((): void => console.log("setInterval"), 5 * 60 * 1000));
	}

	public override onunload(): void {
		// Intentionally left blank
	}

	public async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	public async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}

