import {UnicodeCodepoint} from "../../libraries/types/codepoint/unicode";

export interface CodepointStore {

    /**
     * Retrieve all characters.
     */
    getCodepoints(): Promise<UnicodeCodepoint[]>;
}
