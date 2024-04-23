import {Char} from "./Char";

export interface CodepointKey {
    /**
     * A single character defined by a Unicode code point
     * @maxLength 1
     * @minLength 1
     */
    codepoint: Char;
}
