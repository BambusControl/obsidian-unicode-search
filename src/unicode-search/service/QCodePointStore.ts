import {QCodePointData} from "../../libraries/types/data/QCodePointData";

export interface QCodePointStore {

    /**
     * Retrieve all characters.
     */
    getCharacters(): Promise<QCodePointData>;

    /**
     * Replace the current set of characters completely.
     * @param codePoints
     */
    initializeCodePoints(codePoints: QCodePointData): Promise<void>;
}
