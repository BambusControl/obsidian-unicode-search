import type { DateString } from "./useRecord";

/**
 * Raw favorite information, as stored in save data
 */
export interface Favorite {
	/**
	 * Date when the codePoint was added to favorites
	 */
	added: DateString;

	/**
	 * Whether the codePoint has a quickInsertEnabled command
	 */
	quickInsertEnabled: boolean;
}

/**
 * Parsed favorite information for use in the plugin
 */
export interface ParsedFavorite {
	/**
	 * Date when the codePoint was added to favorites
	 */
	added: Date;

	/**
	 * Whether the codePoint has a quickInsertEnabled command
	 */
	quickInsertEnabled: boolean;
}
