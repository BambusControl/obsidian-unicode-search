import {UnicodeBlock} from "./unicodeBlock";
import {UnicodePlaneNumber} from "../../data/oud/unicodePlaneNumber";
import {CodepointInterval} from "../codepoint/codepointInterval";

export interface UnicodePlane {
    planeNumber: UnicodePlaneNumber,
    description: string,
    abbreviation: string,
    interval: CodepointInterval,
    blocks: UnicodeBlock[],
}
