import {CodepointData} from "../../libraries/types/data/QCodepointData";

export interface CodepointStore {

    /**
     * Retrieve all characters.
     */
    getCharacters(): Promise<CodepointData>;

    /**
     * Replace the current set of characters completely.
     * @param codepoints
     */
    initializeCodepoints(codepoints: CodepointData): Promise<void>;
}
