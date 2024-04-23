import {CodepointInterval} from "./codePointInterval";
import {UnicodePlaneNumber} from "../data/unicodePlaneNumber";

export interface UnicodeBlock {
    interval: CodepointInterval,
    description: string,
    plane: UnicodePlaneNumber
}
