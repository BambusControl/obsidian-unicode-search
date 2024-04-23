import {QCodePoint} from "./QCodePoint";

export interface QCodePointKey {
    /**
     * A single character defined by a Unicode code point
     * @maxLength 1
     * @minLength 1
     */
    codePoint: QCodePoint;
}
