import {Bambus} from "./bambus";

/**
 * Meta information for the datastore
 */
export interface MetaDataNew extends Bambus {
    /**
     * A collection of unique data events.
     */
    events: Array<DataEvent>;
}

/**
 * An event, which communicates information between data parts
 */
export type DataEvent
    = "character filter changed"
    ;
