import {App, Plugin, PluginManifest} from "obsidian";
import {SampleSettingTab} from "./components/sample-setting.tab";
import {UnicodeSearchPluginSettings} from "./data/model/unicode-search-plugin.settings";
import {DEFAULT_SETTINGS} from "./configuration/config";
import {FuzzySearchModal} from "./components/search.modal";
import {UnicodeCharacterStorage} from "./service/unicode-character.storage";
import {ConstantUnicodeCharacterStorage} from "./service/constant-unicode-character.storage";

export default class UnicodeSearchPlugin extends Plugin {

	public settings: UnicodeSearchPluginSettings;

	private readonly service: UnicodeCharacterStorage;

	public constructor(
		app: App,
		manifest: PluginManifest,
		settings: UnicodeSearchPluginSettings,
	) {
		super(app, manifest);
		this.settings = settings;
		this.service = new ConstantUnicodeCharacterStorage();
	}

	public override async onload(): Promise<void> {
		await this.loadSettings();

		// TODO: better commands
		this.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = new FuzzySearchModal(this.app, editor, this.service);
				modal.open();
				return true;
			},
		});

		// TODO: settings
		this.addSettingTab(new SampleSettingTab(this.app, this));
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

