import {UnicodeSearchError} from "./errors/unicode-search.error";
import {INITIAL_SAVE_DATA} from "./constant";
import {DataParser} from "./dataParser";
import {shapeOfSaveData} from "./shape";
import {InvalidSaveData} from "./errors/invalid-save.data";

export class Plugin {
	private readonly loadData: () => Promise<unknown>;
	private readonly parser: DataParser;


	public constructor() {
		// TODO data loading
		this.loadData = () => Promise.resolve({});
		this.parser = new DataParser();
	}

	public async load(): Promise<void> {
		console.debug("Loading save data");
		const rawData = await this.getRawSaveData();

		console.debug("Parsing save data");
		if (!shapeOfSaveData(rawData)) {
			throw new InvalidSaveData("Save data structure invalid");
		}

		const d1 = this.parser.parseMetaData(rawData);
		// Check version and run migration of data if necessary.

		const d2 = this.parser.parseSettingsData(d1);
		// Future: check settings for registering commands.

		const d3 = this.parser.parsePrimaryData(d2);
		// Check if the data is empty and character data needs to be fetched.

		this.registerObsidianCommands();
	}

	private async getRawSaveData(): Promise<unknown> {
		const rawData = await this.loadData();

		if (rawData != null) {
			console.debug("Raw save data loaded successfully");
			return rawData;
		}

		console.info("No save data found, initializing")
		return INITIAL_SAVE_DATA();
	}

	private registerObsidianCommands(): void {
		throw new UnicodeSearchError("Not yet implemented");
	}

}

