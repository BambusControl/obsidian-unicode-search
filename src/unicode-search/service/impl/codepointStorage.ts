import {RootDataStore} from "../rootDataStore";
import {CodepointStore} from "../codePointStore";
import {Codepoints} from "../../../libraries/types/codepoint/codepoint";

export class CodepointStorage implements CodepointStore {

    constructor(private readonly store: RootDataStore) {
    }

    async getCodepoints(): Promise<Codepoints> {
        return (await this.store.getUnicode()).codepoints;
    }

    async initializeCodepoints(codepoints: Codepoints): Promise<void> {
        await this.store.overwriteUnicode({
            initialized: true,
            codepoints: codepoints,
        });
    }

}
