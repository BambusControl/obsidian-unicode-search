import {RootDataStore} from "../rootDataStore";
import {CodepointStore} from "../codePointStore";
import {UnicodeCodepoint} from "../../../libraries/types/codepoint/codepoint";

export class CodepointStorage implements CodepointStore {

    constructor(private readonly store: RootDataStore) {
    }

    async getCodepoints(): Promise<UnicodeCodepoint[]> {
        return (await this.store.getUnicode()).codepoints;
    }

    async initializeCodepoints(codepoints: UnicodeCodepoint[]): Promise<void> {
        await this.store.overwriteUnicode({
            initialized: true,
            codepoints: codepoints,
        });
    }

}
