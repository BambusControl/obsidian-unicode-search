export interface UnicodeCharacter {
    /**
     * A single character defined by a Unicode Codepoint
     * @maxLength 1
     * @minLength 1
     */
    char: string,

    /**
     * Unicode provided description of the character
     */
    name: string,
}
