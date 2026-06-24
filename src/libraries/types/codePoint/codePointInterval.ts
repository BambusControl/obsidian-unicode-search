import type { CodePoint } from "./unicode";

/**
 * Represents a closed interval/range of Unicode Code Points
 */
export interface CodePointInterval {
	start: CodePoint;
	end: CodePoint;
}
