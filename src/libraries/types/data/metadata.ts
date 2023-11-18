import {DataVersions} from "./data-versions";

/**
 * Meta-properties of the file, required for its validation
 */
export interface Metadata {

    /**
     * True, if the plugin save data is fully initialized
     */
    initialized: boolean;
    version: DataVersions;
}
