export type CodePoint = number;

/**
 * Represents a closed interval/range of Unicode Code Points
 */
export interface CodePointInterval {
    start: CodePoint,
    end: CodePoint,
}
