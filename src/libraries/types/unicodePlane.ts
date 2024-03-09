import {UnicodeBlock} from "./unicodeBlock";

import {CodePointRange} from "./codePointRange";
import {UnicodePlaneNumber} from "./unicodePlaneNumber";

export interface UnicodePlane {
    planeNumber: UnicodePlaneNumber,
    description: string,
    range: CodePointRange,
    blocks: UnicodeBlock[],
}
