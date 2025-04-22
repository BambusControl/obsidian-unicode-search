export type Char = string
export type Codepoint = number;

export interface CodepointKey {
    /**
     * A single character defined by a Unicode code point
     * @maxLength 1
     * @minLength 1
     */
    codepoint: Char;
}

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

export type UnicodeCodepoint = CodepointKey & CodepointAttribute;

