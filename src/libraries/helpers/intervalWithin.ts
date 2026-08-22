import {CodePointInterval} from "../types/codePoint/codePointInterval";

export function intervalWithin(outer: CodePointInterval, inner: CodePointInterval): boolean {
    return outer.start <= inner.start
        && outer.end >= inner.end;
}
