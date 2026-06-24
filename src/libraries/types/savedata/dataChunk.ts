import {SaveDataVersion} from "./version";

/**
 * Top level fragment of self-standing save data
 */
export interface DataChunk {
    initialized: boolean;
    version: SaveDataVersion;
}
