import {App, MarkdownView, Notice, Plugin, PluginManifest} from "obsidian";
import {SampleModal} from "./sample.modal";
import {SampleSettingTab} from "./sample-setting.tab";
import {UnicodeSearchPluginSettings} from "./unicode-search-plugin.settings";
import {DEFAULT_SETTINGS} from "./config";

// Remember to rename these classes and interfaces!

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

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "open-sample-modal-simple",
			name: "Open sample modal (simple)",
			callback: (): void => {
				new SampleModal(this.app).open();
			},
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "sample-editor-command",
			name: "Sample editor command",
			editorCallback: editor => {
				console.log(editor.getSelection());
				editor.replaceSelection("Sample Editor Command");
			},
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: "open-sample-modal-complex",
			name: "Open sample modal (complex)",
			checkCallback: checking => {
				// Conditions to check
				const markdownView: MarkdownView | null = this.app.workspace.getActiveViewOfType(MarkdownView);

				if (!markdownView) {
					return false;
				}

				// If checking is true, we're simply "checking" if the command can be run.
				// If checking is false, then we want to actually perform the operation.
				if (!checking) {
					new SampleModal(this.app).open();
				}

				// This command will only show up in Command Palette when the check function returns true
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

