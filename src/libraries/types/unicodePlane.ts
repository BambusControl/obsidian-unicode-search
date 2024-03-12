import {UnicodeBlock} from "./unicodeBlock";

import {CodePointInterval} from "./codePointInterval";
import {UnicodePlaneNumber} from "../data/unicodePlaneNumber";

export interface UnicodePlane {
    planeNumber: UnicodePlaneNumber,
    description: string,
    interval: CodePointInterval,
    blocks: UnicodeBlock[],
}
