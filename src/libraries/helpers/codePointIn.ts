import {Codepoint, CodepointInterval} from "../types/codePointInterval";

export function codepointIn(codepoint: Codepoint, interval: CodepointInterval): boolean {
    return codepoint >= interval.start
        && codepoint <= interval.end;
}
