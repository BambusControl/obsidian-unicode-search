import {DataVersion} from "../types";
import {PrimaryData, Settings} from "./types-0.4.1-NEXT";

export type SaveDataMeta<T extends DataVersion> = {
	meta: MetaData<T>;
};

/**
 * Data needed for ingesting, verifying and manipulating {@link SaveData}
 */
export type MetaData<T extends DataVersion> = {
	version: T
};

export type SaveDataSettings<T> = {
	settings: Settings<T>;
};

export type SaveDataPrimary<T> = {
	primary: PrimaryData<T>;
};

/**
 * Root of persistent plugin data.
 */
export type SaveData<T extends DataVersion>
	= SaveDataMeta<T>
	& SaveDataSettings
	& SaveDataPrimary
	;
