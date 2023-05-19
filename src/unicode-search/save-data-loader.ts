import {DataParser} from "./data-parser";
import {shapeOfSaveData} from "./shape";
import {InvalidSaveData} from "./errors/invalid-save.data";
import {INITIAL_SAVE_DATA} from "./constant";

export class SaveDataLoader {

	private readonly parser: DataParser;

	public constructor() {
		this.parser = new DataParser();
	}

	public async loadSaveData(data: any): Promise<void> {
		console.debug("Loading save data");
		const rawData = this.initializeData(data);

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
	}

	private initializeData(data: any): unknown {
		if (data != null) {
			console.debug("Raw save data loaded successfully");
			return data;
		}

		console.info("No save data found, initializing")
		return INITIAL_SAVE_DATA();
	}

}
