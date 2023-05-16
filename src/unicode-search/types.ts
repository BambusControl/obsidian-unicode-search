import {Characters} from "../libraries/types/unicode.character";

export type SaveData = {
	meta: MetaData;
	data: Data;
};

export type MetaData = {
	initialized: boolean;
	version: DataVersion
};

export type PluginVersion
	= "0.4.0"
	| "0.4.1"
	;

export type DataVersion = PluginVersion &
	( "0.4.0"
	);

export type Data = {
	characters: Characters,
};
