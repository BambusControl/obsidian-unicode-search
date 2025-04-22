import {DataFragment} from "./dataFragment";
import {UnicodeFilter} from "./unicodeFilter";

/**
 * User saved character filters
 */
export interface FilterFragment extends DataFragment {
    /**
     * Filter criteria for Unicode characters
     */
    unicode: UnicodeFilter;
}
