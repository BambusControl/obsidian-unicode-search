import {DataFragment} from "../../../libraries/types/savedata/nieuw/dataFragment";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaFragment";

/**
 * Manages the lifecycle of a structured data segment, typically stored as JSON.
 * Responsible for initialization and updates of data parts.
 */
export interface DataFragmentManager<Fragment extends DataFragment> {
    /**
     * Initializes the data structure with default/empty values.
     * @param dataSkeleton to be populated with default values
     * @returns the initialized data with defaults applied
     */
    initData(dataSkeleton: DataFragment): Promise<Fragment>;

    /**
     * Migrates data between different versions when the data structure changes.
     * Handles both structural changes and data transformations.
     * @param parsedData to be updated to the current version
     * @param events to be handled by the updater
     * @returns the updated data
     */
    updateData(parsedData: Fragment, events: Set<DataEvent>): Promise<Fragment>;
}
