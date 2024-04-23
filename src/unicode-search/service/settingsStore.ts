import {FilterData} from "../../libraries/types/savedata/filterData";

import {Codepoint} from "../../libraries/types/codepoint/codepoint";
import {CodepointInterval} from "../../libraries/types/codepoint/codepointInterval";

export interface SettingsStore {
    getFilter(): Promise<FilterData>

    // TODO [NEXT]: Settings
    allBlocksIncluded(plane: CodepointInterval): Promise<boolean>
    includeAllBlocks(plane: CodepointInterval, set: boolean): Promise<void>

    getCharacterBlock(blockStart: Codepoint): Promise<boolean>
    setCharacterBlock(blockStart: Codepoint, set: boolean): Promise<void>
}
