import {UnicodeSearchError} from "./errors/unicode-search.error";
import {INITIAL_SAVE_DATA} from "./constant";
import {SaveDataMeta} from "./types";
import {shapeOfSaveDataMeta} from "./shape";

export class Plugin {
	private readonly loadData: () => Promise<unknown>;


	public constructor() {
		// TODO data loading
		this.loadData = () => Promise.resolve({});
	}

	public async load(): Promise<void> {
		await this.loadSaveData();

		this.loadSettings();
		this.loadUnicodeCharacterData();

		this.registerObsidianCommands();
	}

	/**
	 * Load saved data, assert it is valid for current plugin version.
	 * @private
	 */
	private async loadSaveData(): Promise<SaveDataMeta> {
		console.debug("Loading save data")
		const rawData = await this.loadData();

		if (rawData == null) {
			// Initialize
			console.info("Initializing save data")
			return {...INITIAL_SAVE_DATA()};
		}

		if (shapeOfSaveDataMeta(rawData)) {
			console.debug("Save data loaded")
			return rawData;
		}

		throw new UnicodeSearchError("Invalid structure of save file");
	}

	private loadSettings(): void {
		throw new UnicodeSearchError("Not yet implemented");
	}

	/**
	 * Load the unicode character database and transform it for plugin use.
	 * @private
	 */
	private loadUnicodeCharacterData(): void {
		throw new UnicodeSearchError("Not yet implemented");
	}

	private registerObsidianCommands(): void {
		throw new UnicodeSearchError("Not yet implemented");
	}

}
