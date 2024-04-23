import {QRootDataStore} from "./qRootDataStore";
import {QUnicodeData} from "../../libraries/types/data/QCodePointAttribute";
import {UnicodeSearchError} from "../errors/unicodeSearchError";
import {QCodePointStore} from "./QCodePointStore";

export class QtCodePointStore implements QCodePointStore {

    constructor(private readonly store: QRootDataStore) {
    }

    getCharacters(): Promise<QUnicodeData> {
        throw new UnicodeSearchError("Not implemented");
    }

    async initializeCodePoints(codePoints: QUnicodeData): Promise<void> {
        await this.store.overwriteUnicode({
            codepoints: codePoints,
        });
    }

}
