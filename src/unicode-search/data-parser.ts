import {SaveDataMeta, SaveDataPrimary, SaveDataSettings} from "./types";
import {
	shapeOfMetaData,
	shapeOfPrimaryData,
	shapeOfSaveDataMeta,
	shapeOfSaveDataPrimary,
	shapeOfSaveDataSettings,
	shapeOfSettings
} from "./shape";

import {InvalidSaveData} from "./errors/invalid-save.data";
import {INITIAL_SAVE_DATA_META, INITIAL_SAVE_DATA_PRIMARY, INITIAL_SAVE_DATA_SETTINGS} from "./constant";

export class DataParser {
	public parseMetaData<T>(data: T): T & SaveDataMeta {
		if (!shapeOfSaveDataMeta(data)) {
			console.info("Initializing meta data");
			return {
				...data,
				...INITIAL_SAVE_DATA_META()
			}
		}

		if (!shapeOfMetaData(data.meta)) {
			throw new InvalidSaveData("Meta data structure invalid");
		}


		console.debug("Meta data successfully parsed");
		return data;
	}

	public parseSettingsData<T>(data: T): T & SaveDataSettings {
		if (!shapeOfSaveDataSettings(data)) {
			console.info("Initializing settings data");
			return {
				...data,
				...INITIAL_SAVE_DATA_SETTINGS(),
			}
		}

		if (shapeOfSettings(data.settings)) {
			throw new InvalidSaveData("Settings data structure invalid");
		}

		console.debug("Settings data successfully parsed");
		return data;
	}

	public parsePrimaryData<T>(data: T): T & SaveDataPrimary {
		if (!shapeOfSaveDataPrimary(data)) {
			console.info("Initializing primary data");
			return {
				...data,
				...INITIAL_SAVE_DATA_PRIMARY()
			}
		}

		if (!shapeOfPrimaryData(data.primary)) {
			throw new InvalidSaveData("Primary data structure invalid");
		}

		console.debug("Primary data successfully parsed");
		return data;
	}
}
