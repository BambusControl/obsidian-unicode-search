import {CodepointInterval} from "./codePointInterval";

import {UnicodeBlockFilter} from "./unicodeBlockFilter";

export interface UnicodePlaneFilter {
    plane: CodepointInterval;
    select: "ALL" | Array<UnicodeBlockFilter>;
}
