import {DataFragment} from "./dataFragment";
import {UnicodeCodepoint} from "../codepoint/unicode";

/**
 * Downloaded Unicode Character Database
 */
export interface UnicodeFragment extends DataFragment {
    /**
     * Codepoints downloaded from the Unicode Character Database
     */
    codepoints: UnicodeCodepoint[]
}
