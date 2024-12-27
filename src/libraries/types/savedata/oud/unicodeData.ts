import {UnicodeCodepoints} from "../../codepoint/codepoint";
import {Initializable} from "./initializable";

/**
 * Imported Unicode Character Database data.
 */
export interface UnicodeData extends Initializable {
    codepoints: UnicodeCodepoints
}

