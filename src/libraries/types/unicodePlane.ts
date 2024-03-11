import {UnicodeBlock} from "./unicodeBlock";

import {CodePointRange} from "./codePointRange";
import {UnicodePlaneNumber} from "../data/unicodePlaneNumber";

export interface UnicodePlane {
    planeNumber: UnicodePlaneNumber,
    description: string,
    range: CodePointRange,
    blocks: UnicodeBlock[],
}
