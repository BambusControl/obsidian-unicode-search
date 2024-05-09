import {UnicodeCodepoints} from "../../libraries/types/codepoint/codepoint";

export interface CodepointStore {

    /**
     * Retrieve all characters.
     */
    getCodepoints(): Promise<UnicodeCodepoints>;

    /**
     * Replace the current set of characters completely.
     * @param codepoints
     */
    initializeCodepoints(codepoints: UnicodeCodepoints): Promise<void>;
}
