import {QUnicodeData} from "../../libraries/types/data/QCodePointAttribute";

export interface QCodePointStore {

    /**
     * Retrieve all characters.
     */
    getCharacters(): Promise<QUnicodeData>;

    /**
     * Replace the current set of characters completely.
     * @param codePoints
     */
    initializeCodePoints(codePoints: QUnicodeData): Promise<void>;
}
