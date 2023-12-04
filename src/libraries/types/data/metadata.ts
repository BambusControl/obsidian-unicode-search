import {SaveDataVersion} from "./saveDataVersion";

/**
 * Meta-properties of the file, required for its validation
 */
export interface Metadata {

    /**
     * True, if the plugin save data is fully initialized
     */
    initialized: boolean;
    version: SaveDataVersion;
}
