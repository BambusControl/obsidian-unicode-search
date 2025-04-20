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
 * Valid event names related to data operations.
 */
const DATA_EVENTS =
    [ "character filter changed"
    ];

/**
 * An event, which communicates information between data parts
 */
export type DataEvent = typeof DATA_EVENTS[number];

export function isDataEvent(object: any): object is DataEvent {
    return DATA_EVENTS.includes(object);
}
