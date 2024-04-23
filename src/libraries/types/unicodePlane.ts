import {UnicodeBlock} from "./unicodeBlock";
import {UnicodePlaneNumber} from "../data/unicodePlaneNumber";
import {CodepointInterval} from "./codepoint/codepointInterval";

export interface UnicodePlane {
    planeNumber: UnicodePlaneNumber,
    description: string,
    abbreviation: string,
    interval: CodepointInterval,
    blocks: UnicodeBlock[],
}
