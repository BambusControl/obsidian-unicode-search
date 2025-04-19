import {Bambus} from "../../../libraries/types/savedata/nieuw/bambus";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaDataNew";

/**
 * Manages the lifecycle of a structured data segment, typically stored as JSON.
 * Responsible for creation, initialization, updates, and validation of data.
 */
export interface DataPartManager<T extends Bambus> {
    /**
     * Creates the basic structure for this data segment.
     * @param rawData to be structured into the appropriate format
     * @returns the properly structured data
     */
    initSkeleton(rawData: any): Promise<T>;

    /**
     * Initializes the data structure with default values.
     * @param dataSkeleton to be populated with default values
     * @returns the initialized data with defaults applied
     */
    initData(dataSkeleton: T): Promise<T>;

    /**
     * Migrates data between different versions when the data structure changes.
     * Handles both structural changes and data transformations.
     * @param parsedData to be updated to the current version
     * @param events to be handled by the updater
     * @returns the updated data
     */
    updateData(parsedData: T, events: Set<DataEvent>): Promise<T>;
}
