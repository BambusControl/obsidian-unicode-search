import {DataChunk} from "../../libraries/types/savedata/dataChunk";
import {DataEvent} from "../../libraries/types/savedata/metaChunk";

/**
 * Manages the lifecycle of a structured data segment, typically stored as JSON.
 * Responsible for initialization and updates of data parts.
 */
export interface ChunkHandler<Chunk extends DataChunk> {
    /**
     * Initializes the data structure with default/empty values.
     * @param chunk to be populated with default values
     * @returns the initialized data with defaults applied
     */
    initData(chunk: DataChunk): Chunk;

    /**
     * Migrates data between different versions when the data structure changes.
     * Handles both structural changes and data transformations.
     * @param chunk to be updated to the current version
     * @param events to be handled by the updater
     * @returns the updated data
     */
    updateData(chunk: Chunk, events: Set<DataEvent>): Promise<Chunk>;
}
