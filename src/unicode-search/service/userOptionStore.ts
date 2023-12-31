import {UserOptions} from "../../libraries/types/userOptions";

/**
 * Storage service for user settings of the plugin.
 */
export interface UserOptionStore {
    getUserOptions(): Promise<UserOptions>
    saveUserOptions(userOptions: UserOptions): Promise<UserOptions>
}
