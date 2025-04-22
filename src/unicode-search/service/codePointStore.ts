import {UnicodeCodepoint} from "../../libraries/types/codepoint/codepoint";

export interface CodepointStore {

    /**
     * Retrieve all characters.
     */
    getCodepoints(): Promise<UnicodeCodepoint[]>;
}
