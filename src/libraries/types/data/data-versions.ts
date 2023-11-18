/**
 * Version of the save data schema.
 *
 * Must comply with RegEx:
 * ```^[0-9]+\\.[0-9]+\\.[0-9]+(?:-[A-Z]+)?$```
 */
export type DataVersions
	= "0.4.0"
	| "0.5.0"
	| "0.5.0-NEXT"
	// Update only if save data schema changed
    ;
