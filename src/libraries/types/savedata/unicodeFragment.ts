import {DataFragment} from "./dataFragment";
import {UnicodeCodepoint} from "../codepoint/codepoint";

/**
 * Imported Unicode Character Database data.
 */
export interface UnicodeFragment extends DataFragment {
    codepoints: UnicodeCodepoint[]
}
