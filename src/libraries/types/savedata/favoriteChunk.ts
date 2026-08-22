import type {DataChunk} from "./dataChunk";
import type {RawCodePointFavorite} from "../codePoint/extension";

/**
 * Users favorite codePoints
 */
export interface FavoriteChunk extends DataChunk {
    /**
     * List of favorite codePoints
     */
    codePoints: RawCodePointFavorite[];
}
