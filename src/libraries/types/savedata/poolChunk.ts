import {DataChunk} from "./dataChunk";
import {UnicodeFilter} from "./unicodeFilter";

/**
 * User saved character filters
 */
export interface PoolChunk extends DataChunk {
    /**
     * Filter criteria for Unicode characters
     */
    unicode: UnicodeFilter;
}
