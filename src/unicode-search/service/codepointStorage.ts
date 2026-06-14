import {CodepointStore} from "./codePointStore";
import {UnicodeCodepoint} from "../../libraries/types/codepoint/unicode";
import {DexieDb} from "./dexieDb";


export class CodepointStorage implements CodepointStore {

    constructor(private readonly db: DexieDb) {
    }

    async getCodepoints(): Promise<UnicodeCodepoint[]> {
        return this.db.codepoints.toArray();
    }

}
