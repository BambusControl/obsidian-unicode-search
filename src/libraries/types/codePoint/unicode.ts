export type CodePoint = number;

/**
 * Universally used key for a Unicode code point
 */
export interface CodePointKey {
	/**
	 * The numeric address in the Unicode code space
	 */
	id: CodePoint;
}

/**
 * General attributes of a Unicode code point
 */
export interface CodePointAttribute {
	/**
	 * The JavaScript string representation, NFC-normalised
	 * @minLength 1
	 */
	glyph: string;

	/**
	 * Unicode name of the character
	 */
	name: string;

	/**
	 * Unicode General Category abbreviation
	 */
	category: string;
}

/**
 * Unicode character representation throughout the plugin
 */
export type Character = CodePointKey & CodePointAttribute;
