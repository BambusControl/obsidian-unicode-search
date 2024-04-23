import {RootDataStore} from "../qRootDataStore";
import {SettingsStore} from "../QSettingsStore";
import {Filter} from "../../../libraries/types/data/QFilter";
import {Codepoint, CodepointInterval} from "../../../libraries/types/codePointInterval";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";

export class QtSettingsStore implements SettingsStore {

    constructor(private readonly store: RootDataStore) {
    }

    async getFilter(): Promise<Filter> {
        throw new UnicodeSearchError("Not implemented");
    }

    allBlocksIncluded(plane: CodepointInterval): Promise<boolean> {
        throw new UnicodeSearchError("Not implemented");
    }

    getCharacterBlock(blockStart: Codepoint): Promise<boolean> {
        throw new UnicodeSearchError("Not implemented");
    }

    includeAllBlocks(plane: CodepointInterval, set: boolean): Promise<void> {
        throw new UnicodeSearchError("Not implemented");
    }

    setCharacterBlock(blockStart: Codepoint, set: boolean): Promise<void> {
        throw new UnicodeSearchError("Not implemented");
    }

}
