import {UserOptions} from "../../libraries/types/userOptions";

/**
 * Storage service for user options/settings of the plugin.
 */
export interface UserOptionStore {

    fetchUserOptions(): Promise<UserOptions>
    exportUserOptions(userOptions: UserOptions): Promise<UserOptions>

    // pinCharacter(char: CharacterKeyType): void
    // unpinCharacter(char: CharacterKeyType): void
}
