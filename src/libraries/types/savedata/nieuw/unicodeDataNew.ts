import {Bambus} from "./bambus";
import {UnicodeCodepoints} from "../../codepoint/codepoint";

/**
 * Imported Unicode Character Database data.
 */
export interface UnicodeDataNew extends Bambus {
    codepoints: UnicodeCodepoints
}
