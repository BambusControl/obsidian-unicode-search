import {RootDataStore} from "../rootDataStore";
import {CodepointStore} from "../codePointStore";
import {UnicodeCodepoints} from "../../../libraries/types/codepoint/codepoint";

export class CodepointStorage implements CodepointStore {

    constructor(private readonly store: RootDataStore) {
    }

    async getCodepoints(): Promise<UnicodeCodepoints> {
        return (await this.store.getUnicode()).codepoints;
    }

    async initializeCodepoints(codepoints: UnicodeCodepoints): Promise<void> {
        await this.store.overwriteUnicode({
            initialized: true,
            codepoints: codepoints,
        });
    }

}
