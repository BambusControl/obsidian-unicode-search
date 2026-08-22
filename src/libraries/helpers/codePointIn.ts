import {CodePoint} from "../types/codePoint/unicode";
import {CodePointInterval} from "../types/codePoint/codePointInterval";

export function codePointIn(codePoint: CodePoint, interval: CodePointInterval): boolean {
    return codePoint >= interval.start
        && codePoint <= interval.end;
}
