import {QFilter} from "../../libraries/types/data/QFilter";

export interface QSettingsStore {
    // NEXT
    getFilter(): Promise<QFilter>

    /*allBlocksIncluded(plane: CodePointInterval): Promise<boolean>
    includeAllBlocks(plane: CodePointInterval, set: boolean): Promise<void>

    getCharacterBlock(blockStart: CodePoint): Promise<boolean>
    setCharacterBlock(blockStart: CodePoint, set: boolean): Promise<void>*/
}
