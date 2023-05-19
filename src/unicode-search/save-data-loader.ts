import {DataParser} from "./data-parser";
import {shapeOfSaveData} from "./shape";
import {InvalidSaveData} from "./errors/invalid-save.data";
import {INITIAL_SAVE_DATA, LATEST_DATA_VERSION} from "./constant";
import {SaveData} from "./types";
import {DataMigrator} from "./data-migrator";

export class SaveDataLoader {

	private readonly parser: DataParser;
	private readonly migrator: DataMigrator;

	public constructor() {
		this.parser = new DataParser();
		this.migrator = new DataMigrator();
	}

	public async loadSaveData(data: any): Promise<void> {
		console.debug("Loading save data");
		const rawData = this.initializeData(data);

		if (!shapeOfSaveData(rawData)) {
			throw new InvalidSaveData("Save data structure invalid");
		}

		const saveData = this.parser.parseData(rawData);
		this.checkAndMigrate(saveData);

		// Check version and run migration of data if necessary.
		// Future: check settings for registering commands.
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

	/**
	 * Check {@link saveData} version and run migration of data if necessary.
	 */
	private checkAndMigrate(saveData: SaveData): void {
		const needsMigration = saveData.meta.version !== LATEST_DATA_VERSION();
		console.debug(`Migration of save data ${needsMigration ? "" : "not"} needed`);

		if (needsMigration) {
			this.migrator.migrateSaveData(saveData);
		}
	}

}
