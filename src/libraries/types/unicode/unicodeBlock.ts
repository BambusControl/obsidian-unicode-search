import {UnicodePlaneNumber} from "../../data/unicodePlaneNumber";

import {CodePointInterval} from "../codePoint/codePointInterval";

export interface UnicodeBlock {
    interval: CodePointInterval,
    description: string,
    plane: UnicodePlaneNumber
}
