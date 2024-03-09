import {UnicodeBlock} from "./unicodeBlock";

import {CodePointRange} from "./codePointRange";

export interface UnicodePlane {
    description: string,
    range: CodePointRange,
    blocks: UnicodeBlock[],
}
