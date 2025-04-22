import {DataFragment} from "../../libraries/types/savedata/dataFragment";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";

/**
 * Manages the lifecycle of a structured data segment, typically stored as JSON.
 * Responsible for initialization and updates of data parts.
 */
export interface DataFragmentManager<Fragment extends DataFragment> {
    /**
     * Initializes the data structure with default/empty values.
     * @param fragment to be populated with default values
     * @returns the initialized data with defaults applied
     */
    initData(fragment: DataFragment): Fragment;

    /**
     * Migrates data between different versions when the data structure changes.
     * Handles both structural changes and data transformations.
     * @param fragment to be updated to the current version
     * @param events to be handled by the updater
     * @returns the updated data
     */
    updateData(fragment: Fragment, events: Set<DataEvent>): Promise<Fragment>;
}
