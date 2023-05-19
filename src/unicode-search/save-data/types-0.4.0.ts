import {Characters} from "../../libraries/types/unicode.character";
import {DataVersion} from "../types";

export type SaveDataMeta = {
	meta: MetaData;
};
export type SaveDataSettings = {
	settings: Settings;
};
export type SaveDataPrimary = {
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
 * Primary plugin data used for its core functionality.
 */
export type PrimaryData = {
	characters: Characters,
};
/**
 * User customizable plugin settings.
 */
export type Settings = {};
