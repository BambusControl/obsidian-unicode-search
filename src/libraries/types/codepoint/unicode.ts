export type Char = string
export type Codepoint = number;

/**
 * Universally used key for a Unicode codepoint
 */
export interface CodepointKey {
    /**
     * A single Unicode code point character defined by its normalized NFC form
     * @maxLength 2
     * @minLength 1
     */
    codepoint: Char;
}

/**
 * General attributes of a Unicode codepoint
 */
export interface CodepointAttribute {
    /**
     * Unicode provided description of the character
     */
    name: string;

    /**
     * Unicode category of the character
     */
    category: string;
}

/**
 * Unicode codepoint representation throughout the plugin
 */
export type UnicodeCodepoint = CodepointKey & CodepointAttribute;
