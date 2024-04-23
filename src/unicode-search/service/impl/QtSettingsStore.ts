import {QRootDataStore} from "../qRootDataStore";
import {QSettingsStore} from "../QSettingsStore";
import {QFilter} from "../../../libraries/types/data/QFilter";
import {CodePoint, CodePointInterval} from "../../../libraries/types/codePointInterval";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";

export class QtSettingsStore implements QSettingsStore {

    constructor(private readonly store: QRootDataStore) {
    }

    async getFilter(): Promise<QFilter> {
        throw new UnicodeSearchError("Not implemented");
    }

    allBlocksIncluded(plane: CodePointInterval): Promise<boolean> {
        throw new UnicodeSearchError("Not implemented");
    }

    getCharacterBlock(blockStart: CodePoint): Promise<boolean> {
        throw new UnicodeSearchError("Not implemented");
    }

    includeAllBlocks(plane: CodePointInterval, set: boolean): Promise<void> {
        throw new UnicodeSearchError("Not implemented");
    }

    setCharacterBlock(blockStart: CodePoint, set: boolean): Promise<void> {
        throw new UnicodeSearchError("Not implemented");
    }

}
