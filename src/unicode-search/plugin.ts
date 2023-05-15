import {ObsidianUnicodeSearchError} from "./errors/obsidian-unicode-search.error";

export class Plugin {

	public load(): void {
		this.loadPluginData();

		this.loadSettings();
		this.loadUnicodeCharacterData();

		this.registerObsidianCommands();
	}

	/**
	 * Load saved data, assert it is valid for current plugin version.
	 * @private
	 */
	private loadPluginData(): unknown | "dataOrNone" {
		throw new ObsidianUnicodeSearchError("Not yet implemented");
	}

	private loadSettings(): void {
		throw new ObsidianUnicodeSearchError("Not yet implemented");
	}

	/**
	 * Load the unicode character database and transform it for plugin use.
	 * @private
	 */
	private loadUnicodeCharacterData(): void {
		throw new ObsidianUnicodeSearchError("Not yet implemented");
	}

	private registerObsidianCommands(): void {
		throw new ObsidianUnicodeSearchError("Not yet implemented");
	}

}
