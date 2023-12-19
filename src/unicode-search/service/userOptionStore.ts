import {UserOptions} from "../../libraries/types/userOptions";

/**
 * Storage service for user settings of the plugin.
 */
export interface UserOptionStore {
    fetchUserOptions(): Promise<UserOptions>
    exportUserOptions(userOptions: UserOptions): Promise<UserOptions>
}
