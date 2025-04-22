import {Codepoint} from "../types/codepoint/unicode";
import {CodepointInterval} from "../types/codepoint/codepointInterval";

export function codepointIn(codepoint: Codepoint, interval: CodepointInterval): boolean {
    return codepoint >= interval.start
        && codepoint <= interval.end;
}
