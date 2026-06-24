import {SaveDataVersion} from "./version";

/**
 * Top level chunk of self-standing save data
 */
export interface DataChunk {
    initialized: boolean;
    version: SaveDataVersion;
}
