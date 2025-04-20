import {DataFragment} from "./dataFragment";

/**
 * Meta information for the datastore
 */
export interface MetaFragment extends DataFragment {
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
