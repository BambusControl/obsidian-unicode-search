import {CodepointStore} from "../codePointStore";
import {UnicodeCodepoint} from "../../../libraries/types/codepoint/codepoint";
import {RootDataStoreNew} from "../rootDataStoreNew";

export class CodepointStorageNew implements CodepointStore {

    constructor(private readonly store: RootDataStoreNew) {
    }

    async getCodepoints(): Promise<UnicodeCodepoint[]> {
        return (await this.store.getUnicode()).codepoints;
    }

}
