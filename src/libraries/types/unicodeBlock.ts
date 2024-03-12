import {CodePointInterval} from "./codePointInterval";
import {UnicodePlaneNumber} from "../data/unicodePlaneNumber";

export interface UnicodeBlock {
    interval: CodePointInterval,
    description: string,
    plane: UnicodePlaneNumber
}
