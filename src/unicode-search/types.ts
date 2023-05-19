/**
 * Every released plugin version.
 * The latest version must be same as in `package.json` & `manifest.json`
 */
export type PluginVersion
	= "0.4.0"
	| "0.4.1"
	| "0.4.1-NEXT"
	;

/**
 * Versions of save data.
 * Must be a {@link PluginVersion} value.
 */
export type DataVersion = Extract<PluginVersion,
	( "0.4.0"
	| "0.4.1-NEXT"
	)>;
