import {Codepoints} from "../../libraries/types/codepoint/codepoint";

export interface CodepointStore {

    /**
     * Retrieve all characters.
     */
    getCodepoints(): Promise<Codepoints>;

    /**
     * Replace the current set of characters completely.
     * @param codepoints
     */
    initializeCodepoints(codepoints: Codepoints): Promise<void>;
}
