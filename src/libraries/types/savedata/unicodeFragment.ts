import {DataFragment} from "./dataFragment";
import {UnicodeCodepoint} from "../codepoint/unicode";

/**
 * Imported Unicode Character Database data.
 */
export interface UnicodeFragment extends DataFragment {
    codepoints: UnicodeCodepoint[]
}
