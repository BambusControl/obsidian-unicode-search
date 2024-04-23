import {Filter} from "../../libraries/types/data/QFilter";
import {Codepoint, CodepointInterval} from "../../libraries/types/codePointInterval";

export interface SettingsStore {
    getFilter(): Promise<Filter>

    // NEXT
    allBlocksIncluded(plane: CodepointInterval): Promise<boolean>
    includeAllBlocks(plane: CodepointInterval, set: boolean): Promise<void>

    getCharacterBlock(blockStart: Codepoint): Promise<boolean>
    setCharacterBlock(blockStart: Codepoint, set: boolean): Promise<void>
}
