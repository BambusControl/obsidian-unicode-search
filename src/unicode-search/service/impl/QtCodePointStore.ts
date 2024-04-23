import {QRootDataStore} from "../qRootDataStore";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {QCodePointStore} from "../QCodePointStore";
import {QCodePointData} from "../../../libraries/types/data/QCodePointData";

export class QtCodePointStore implements QCodePointStore {

    constructor(private readonly store: QRootDataStore) {
    }

    async getCharacters(): Promise<QCodePointData> {
        return (await this.store.getUnicode()).codepoints;
    }

    async initializeCodePoints(codePoints: QCodePointData): Promise<void> {
        await this.store.overwriteUnicode({
            initialized: true,
            codepoints: codePoints,
        });
    }

}
