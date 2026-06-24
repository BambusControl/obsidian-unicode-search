import {CodePointInterval} from "../types/codePoint/codePointInterval";

export function intervalsEqual(left: CodePointInterval, right: CodePointInterval): boolean {
    return left.start === right.start
        && left.end === right.end;
}
