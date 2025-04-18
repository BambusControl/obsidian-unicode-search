import {UnicodeCodepoint} from "../../libraries/types/codepoint/codepoint";

export interface CodepointStore {

    /**
     * Retrieve all characters.
     */
    getCodepoints(): Promise<UnicodeCodepoint[]>;

    /**
     * Replace the current set of characters completely.
     * @param codepoints
     */
    initializeCodepoints(codepoints: UnicodeCodepoint[]): Promise<void>;
}
