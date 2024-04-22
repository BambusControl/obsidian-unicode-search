import {QUnicodeData} from "../../libraries/types/data/QCodePointAttribute";
import {QRootDataStore} from "./qRootDataStore";
import {UnicodeSearchError} from "../errors/unicodeSearchError";

export interface QCodePointStore {

    /**
     * Retrieve all characters.
     */
    getCharacters(): Promise<QUnicodeData>;

    /**
     * Replace the current set of characters completely.
     * @param characters
     */
    initializeCharacters(characters: QUnicodeData): Promise<void>;
}

export class QtCodePointStore implements QCodePointStore {

    constructor(private readonly store: QRootDataStore) {
    }

    getCharacters(): Promise<QUnicodeData> {
        throw new UnicodeSearchError("Not implemented");
    }

    initializeCharacters(characters: QUnicodeData): Promise<void> {
        return this.store.overwriteUnicodeData(characters);
    }

}
