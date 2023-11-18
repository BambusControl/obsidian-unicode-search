import {Metadata} from "./metadata";
import {Character} from "../character";

/**
 * Save data exported by the plugin
 */
export interface SaveData {
    meta: Metadata;

    /**
     * Locally stored characters
     */
    data: Character[];
}

