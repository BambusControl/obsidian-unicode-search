import {CodePoint, CodePointInterval} from "../../libraries/types/codePointInterval";

/**
 * Storage service for user settings of the plugin.
 */
export interface OptionsStore {
    allBlocksIncluded(plane: CodePointInterval): Promise<boolean>
    includeAllBlocks(plane: CodePointInterval, set: boolean): Promise<void>

    getCharacterBlock(blockStart: CodePoint): Promise<boolean>
    setCharacterBlock(blockStart: CodePoint, set: boolean): Promise<void>
}

