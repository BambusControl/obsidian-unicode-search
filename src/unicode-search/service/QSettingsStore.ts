import {QFilter} from "../../libraries/types/data/QFilter";
import {CodePoint, CodePointInterval} from "../../libraries/types/codePointInterval";

export interface QSettingsStore {
    getFilter(): Promise<QFilter>

    // NEXT
    allBlocksIncluded(plane: CodePointInterval): Promise<boolean>
    includeAllBlocks(plane: CodePointInterval, set: boolean): Promise<void>

    getCharacterBlock(blockStart: CodePoint): Promise<boolean>
    setCharacterBlock(blockStart: CodePoint, set: boolean): Promise<void>
}
