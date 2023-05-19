import {DataVersion, PluginVersion, SaveData, SaveDataMeta, SaveDataPrimary, SaveDataSettings} from "./types";
import {Shape} from "./shape";

/*
* The easiest way to make sure this value doesn't get modified is to create a new object each time.
*/

export function INITIAL_SAVE_DATA(): Shape<SaveData> {
	return {
		meta: null,
		settings: null,
		primary: null,
	};
}

export function INITIAL_SAVE_DATA_META(): SaveDataMeta {
	return {
		meta: {
			version: "0.4.0",
		},
	}
}

export function INITIAL_SAVE_DATA_SETTINGS(): SaveDataSettings {
	return {
		settings: {
		},
	}
}

export function INITIAL_SAVE_DATA_PRIMARY(): SaveDataPrimary {
	return {
		primary: {
			characters: []
		}
	}
}

export function LATEST_PLUGIN_VERSION(): PluginVersion {
	return "0.4.1-NEXT";
}

export function LATEST_DATA_VERSION(): DataVersion {
	return "0.4.1-NEXT";
}
