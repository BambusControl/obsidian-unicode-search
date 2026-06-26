import type {Character} from "../../libraries/types/codePoint/unicode";

export interface CodePointStore {
    /**
     * Retrieve all characters.
     */
    getCharacters(): Promise<Character[]>;
}
