import {CodepointStore} from "../codePointStore";
import {UnicodeCodepoint} from "../../../libraries/types/codepoint/codepoint";
import {RootDataStore} from "../rootDataStore";

export class CodepointStorage implements CodepointStore {

    constructor(private readonly store: RootDataStore) {
    }

    async getCodepoints(): Promise<UnicodeCodepoint[]> {
        return (await this.store.getUnicode()).codepoints;
    }

}
