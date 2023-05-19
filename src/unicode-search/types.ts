import {Characters} from "../libraries/types/unicode.character";

export type NotNull = {};

export type SaveDataMeta = {
	meta: MetaData;
};

export type SaveDataSettings = {
	settings: Settings;
};

export type SaveDataPrimary = {
	primary: PrimaryData;
};

/**
 * Root of persistent plugin data.
 */
export type SaveData
	= SaveDataMeta
	& SaveDataSettings
	& SaveDataPrimary
	;

/**
 * Data needed for ingesting, verifying and manipulating {@link SaveData}
 */
export type MetaData = {
	version: DataVersion
};

/**
 * Every released plugin version.
 * The latest version must be same as in `package.json` & `manifest.json`
 */
export type PluginVersion
	= "0.4.0"
	| "0.4.1"
	;

/**
 * Versions of save data.
 * Must be a {@link PluginVersion} value.
 */
export type DataVersion = Extract<PluginVersion,
	( "0.4.0"
	)>;


/**
 * Primary plugin data used for its core functionality.
 */
export type PrimaryData = {
	characters: Characters,
};

/**
 * User customizable plugin settings.
 */
export type Settings = {
};
