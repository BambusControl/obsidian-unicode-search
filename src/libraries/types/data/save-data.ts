import {Characters} from "../unicode.character";
import {Metadata} from "./metadata";

/**
 * Save data exported by the plugin
 */
export interface SaveData {
    meta: Metadata;

    /**
     * Locally stored characters
     */
    data: Characters;
}

