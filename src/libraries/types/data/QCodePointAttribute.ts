export type QCodePoint = string

export interface QCodePointAttribute {
    /**
     * A single character defined by a Unicode code point
     * @maxLength 1
     * @minLength 1
     */
    /*char: QCodePoint;*/

    /**
     * Unicode provided description of the character
     */
    name: string;
    classifier: string;
}

export type QUnicodeMap<T> = Map<QCodePoint, T>
export type QUnicodeData = QUnicodeMap<QCodePointAttribute>

export interface QUnicodeCodePointWithAttributes {
    /**
     * A single character defined by a Unicode code point
     * @maxLength 1
     * @minLength 1
     */
    codePoint: QCodePoint;

    /**
     * Unicode provided description of the character
     */
    name: string;
    classifier: string;
}
