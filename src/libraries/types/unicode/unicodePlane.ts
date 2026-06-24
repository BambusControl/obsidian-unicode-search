import {UnicodeBlock} from "./unicodeBlock";
import {UnicodePlaneNumber} from "../../data/unicodePlaneNumber";
import {CodePointInterval} from "../codePoint/codePointInterval";

export interface UnicodePlane {
    planeNumber: UnicodePlaneNumber,
    description: string,
    abbreviation: string,
    interval: CodePointInterval,
    blocks: UnicodeBlock[],
}
