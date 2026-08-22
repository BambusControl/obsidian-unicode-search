import {DataChunk} from "./dataChunk";
import {Character} from "../codePoint/unicode";

/**
 * Downloaded Unicode Character Database
 */
export interface CharacterChunk extends DataChunk {
    /**
     * CodePoints downloaded from the Unicode Character Database
     */
    codePoints: Character[]
}
