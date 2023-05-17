import {MetaData, PrimaryData, SaveData, SaveDataMeta, SaveDataPrimary, SaveDataSettings, Settings} from "./types";

type Shape<T> = {
  [P in keyof T]: unknown;
};

export function shapeOfSaveDataMeta(object: any): object is SaveDataMeta {
	return containsProperties<SaveDataMeta>(object, "meta")
		&& shapeOfMetaData(object.meta)
}

export function shapeOfSaveDataSettings(object: any): object is SaveDataSettings {
	return containsProperties<SaveDataSettings>(object, "settings")
		&& shapeOfSettings(object.settings)
}

export function shapeOfSaveDataPrimary(object: any): object is SaveDataPrimary {
	return containsProperties<SaveDataPrimary>(object, "primary")
		&& shapeOfPrimaryData(object.primary)
}

export function shapeOfSaveData(object: any): object is SaveData {
	return containsProperties<SaveData>(object, "primary", "meta", "settings")
}

export function shapeOfMetaData(object: any): object is MetaData {
	return containsProperties<MetaData>(object, "version")
}

export function shapeOfSettings(object: any): object is Settings {
	return containsProperties<Settings>(object)
}

export function shapeOfPrimaryData(object: any): object is PrimaryData {
	return containsProperties<PrimaryData>(object, "characters")
}

function containsProperties<T>(object: any, ...keys: Array<keyof T>): object is Shape<T> {
	return object != null
		&& keys.unique().every(key => key in object);
}
