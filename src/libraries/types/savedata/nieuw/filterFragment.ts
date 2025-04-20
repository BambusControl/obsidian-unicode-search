import {DataFragment} from "./dataFragment";
import {UnicodeFilter} from "../oud/unicodeFilter";

/**
 * User saved character filters.
 */
export interface FilterFragment extends DataFragment {
    /**
     * Whether the filter has been modified and reinitialization is needed.
     */
    modified: boolean;
    unicode: UnicodeFilter;
}
