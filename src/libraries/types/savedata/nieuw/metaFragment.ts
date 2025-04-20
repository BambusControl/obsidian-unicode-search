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
export enum DataEvent {
    DownloadCharacters = "download_characters",
}

export function isDataEvent(object: any): object is DataEvent {
    return Object.values(DataEvent).includes(object);
}
