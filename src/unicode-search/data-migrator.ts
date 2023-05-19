import {LATEST_DATA_VERSION} from "./constant";
import {MetaData, PrimaryData, SaveData, Settings} from "./save-data/types-0.4.1-NEXT";

export class DataMigrator {

	public migrateSaveData(data: SaveData): SaveData {
		console.group("Save data migration");

		const migData = {...data};
		migData.meta = this.migrateMetaData(migData.meta);
		migData.settings = this.migrateSettingsData(migData.settings);
		migData.primary = this.migratePrimaryData(migData.primary);

		console.info("Save data successfully migrated");
		console.groupEnd();
		return migData;
	}

	private migrateMetaData(metaData: MetaData): MetaData {
		metaData.version = LATEST_DATA_VERSION();

		console.debug("Meta data successfully migrated");
		return metaData;
	}

	private migrateSettingsData(settingsData: Settings): Settings {
		console.debug("Settings data successfully migrated");
		return settingsData;
	}

	private migratePrimaryData(primaryData: PrimaryData): PrimaryData {
		// TODO primary data migration
		console.debug("Primary data successfully migrated");
		return primaryData;
	}

}
