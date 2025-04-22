import {DataFragment} from "./dataFragment";
import { PluginVersion } from "./version";

/**
 * Meta information for the datastore
 */
export interface MetaFragment extends DataFragment {
    /**
     * Latest used version of the plugin which used this data
     */
    pluginVersion: PluginVersion;

    /**
     * A collection of unique data events.
     */
    events: DataEvent[];
}

/**
 * An event, which communicates information between data parts
 */
export enum DataEvent {
    DownloadCharacters = "download_characters",
}

/**
 * Checks if the given object is a valid DataEvent.
 * @param object The object to check.
 * @returns True if the object is a valid DataEvent, false otherwise.
 */
export function isDataEvent(object: any): object is DataEvent {
    return Object.values(DataEvent).includes(object);
}
