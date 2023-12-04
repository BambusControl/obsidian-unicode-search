import {Metadata} from "./metadata";
import {Character} from "../character";
import {UserOptions} from "../userOptions";

/**
 * Save data exported by the plugin
 */
export interface SaveData {
    meta: Metadata;
    user: UserOptions;

    /**
     * Locally stored characters
     */
    data: Character[];
}

