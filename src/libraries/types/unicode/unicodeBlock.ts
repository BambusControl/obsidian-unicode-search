import {UnicodePlaneNumber} from "../../data/oud/unicodePlaneNumber";

import {CodepointInterval} from "../codepoint/codepointInterval";

export interface UnicodeBlock {
    interval: CodepointInterval,
    description: string,
    plane: UnicodePlaneNumber
}
