import {UserOptions} from "../../libraries/types/userOptions";

/**
 * Storage service for user options/settings of the plugin.
 */
export interface UserOptionStore {
    getUserOptions(): UserOptions
}
