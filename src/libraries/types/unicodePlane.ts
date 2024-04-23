import {UnicodeBlock} from "./unicodeBlock";

import {CodepointInterval} from "./codePointInterval";
import {UnicodePlaneNumber} from "../data/unicodePlaneNumber";

export interface UnicodePlane {
    planeNumber: UnicodePlaneNumber,
    description: string,
    abbreviation: string,
    interval: CodepointInterval,
    blocks: UnicodeBlock[],
}
