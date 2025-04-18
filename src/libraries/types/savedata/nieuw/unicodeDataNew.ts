import {Bambus} from "./bambus";
import {UnicodeCodepoint} from "../../codepoint/codepoint";

/**
 * Imported Unicode Character Database data.
 */
export interface UnicodeDataNew extends Bambus {
    codepoints: UnicodeCodepoint[]
}
