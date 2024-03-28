import {CodePoint, CodePointInterval} from "../types/codePointInterval";

export function codePointIn(codePoint: CodePoint, interval: CodePointInterval): boolean {
    return codePoint >= interval.start
        && codePoint <= interval.end;
}
