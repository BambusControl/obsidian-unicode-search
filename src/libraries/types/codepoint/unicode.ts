/**
 * Unicode code point character defined by its normalized NFC form
 */
export type CharLiteral = string

/**
 * The literal numeric value of a Unicode code point
 */
export type CodepointLiteral = number;

/**
 * Universally used key for a Unicode codepoint
 */
export interface CodepointKey {
    /**
     * The literal numeric value of a Unicode code point
     *
     * @remarks
     * I assumed that two codepoint-string-representations cannot be the same and previously used CharLiteral.
     * That is not the case. Multiple number-codepoints represent the same character when parsed into JavaScript.
     */
    id: CodepointLiteral;
}

/**
 * General attributes of a Unicode codepoint
 */
export interface CodepointAttribute {
    /**
     * Unicode code point character defined by its normalized NFC form
     * @minLength 1
     */
    literal: CharLiteral;

    /**
     * Unicode name of the character
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
