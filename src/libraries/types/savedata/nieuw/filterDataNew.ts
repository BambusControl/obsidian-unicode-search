import {Bambus} from "./bambus";
import {UnicodeFilter} from "../oud/unicodeFilter";

/**
 * User saved character filters.
 */
export interface FilterDataNew extends Bambus {
    /**
     * Whether the filter has been modified and reinitialization is needed.
     */
    modified: boolean;
    unicode: UnicodeFilter;
}
