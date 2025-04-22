import {SaveDataVersion} from "./saveDataVersion";

/**
 * Top level fragment of self-standing save data
 */
export interface DataFragment {
    initialized: boolean;
    version: SaveDataVersion;
}
