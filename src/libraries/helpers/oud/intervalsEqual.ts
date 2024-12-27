import {CodepointInterval} from "../../types/codepoint/codepointInterval";

export function intervalsEqual(left: CodepointInterval, right: CodepointInterval): boolean {
    return left.start === right.start
        && left.end === right.end;
}
