import {Codepoint} from "./unicode";

/**
 * Represents a closed interval/range of Unicode Code Points
 */
export interface CodepointInterval {
    start: Codepoint,
    end: Codepoint,
}
