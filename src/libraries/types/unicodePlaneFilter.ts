import {CodePointInterval} from "./codePointInterval";

import {UnicodeBlockFilter} from "./unicodeBlockFilter";

export interface UnicodePlaneFilter {
    plane: CodePointInterval;
    select: "ALL" | Array<UnicodeBlockFilter>;
}
