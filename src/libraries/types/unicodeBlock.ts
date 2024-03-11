import {CodePointRange} from "./codePointRange";
import {UnicodePlaneNumber} from "../data/unicodePlaneNumber";

export interface UnicodeBlock {
    range: CodePointRange,
    description: string,
    plane: UnicodePlaneNumber
}
