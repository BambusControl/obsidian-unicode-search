import {QUnicodeData} from "../../libraries/types/data/QCodePointAttribute";
import {QRootDataStore} from "./qRootDataStore";
import {ObsidianUnicodeSearchError} from "../errors/obsidianUnicodeSearchError";

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
    public constructor(
        private readonly store: QRootDataStore
    ) {
    }

    getCharacters(): Promise<QUnicodeData> {
        throw new ObsidianUnicodeSearchError("Not implemented");
    }

    initializeCharacters(characters: QUnicodeData): Promise<void> {
        throw new ObsidianUnicodeSearchError("Not implemented");
    }
}
