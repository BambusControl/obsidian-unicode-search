import {DataChunk} from "./dataChunk";
import {RawCodePointUse} from "../codePoint/extension";

/**
 * User generated usage data
 */
export interface UseHistoryChunk extends DataChunk {
    /**
     * Statistics of the individual codePoint usage
     */
    codePoints: RawCodePointUse[]
}
