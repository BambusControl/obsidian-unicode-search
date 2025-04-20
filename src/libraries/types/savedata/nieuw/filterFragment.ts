import {DataFragment} from "./dataFragment";
import {UnicodeFilter} from "../oud/unicodeFilter";

/**
 * User saved character filters.
 */
export interface FilterFragment extends DataFragment {
    unicode: UnicodeFilter;
}
