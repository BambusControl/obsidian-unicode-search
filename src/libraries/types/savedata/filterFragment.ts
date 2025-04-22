import {DataFragment} from "./dataFragment";
import {UnicodeFilter} from "./unicodeFilter";

/**
 * User saved character filters.
 */
export interface FilterFragment extends DataFragment {
    unicode: UnicodeFilter;
}
