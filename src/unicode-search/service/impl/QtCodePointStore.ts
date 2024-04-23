import {RootDataStore} from "../qRootDataStore";
import {CodepointStore} from "../QCodepointStore";
import {CodepointData} from "../../../libraries/types/data/QCodepointData";

export class QtCodepointStore implements CodepointStore {

    constructor(private readonly store: RootDataStore) {
    }

    async getCharacters(): Promise<CodepointData> {
        return (await this.store.getUnicode()).codepoints;
    }

    async initializeCodepoints(codepoints: CodepointData): Promise<void> {
        await this.store.overwriteUnicode({
            initialized: true,
            codepoints: codepoints,
        });
    }

}
