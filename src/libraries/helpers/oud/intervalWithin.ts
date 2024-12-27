import {CodepointInterval} from "../../types/codepoint/codepointInterval";

export function intervalWithin(outer: CodepointInterval, inner: CodepointInterval): boolean {
    return outer.start <= inner.start
        && outer.end >= inner.end;
}
