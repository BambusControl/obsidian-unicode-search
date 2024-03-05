import {UserOptions} from "../../libraries/types/userOptions";
import {CharacterFilterOptions} from "../../libraries/types/characterFilterOptions";
import {UnicodeSubcategory} from "../../libraries/types/unicodeCategory";

/**
 * Storage service for user settings of the plugin.
 */
export interface UserOptionStore {
    getUserOptions(): Promise<UserOptions>
    saveUserOptions(userOptions: UserOptions): Promise<UserOptions>
    saveCharacterFilterOptions(filterOptions: CharacterFilterOptions): Promise<CharacterFilterOptions>
    setCharacterSubcategory(category: UnicodeSubcategory, set: boolean): Promise<CharacterFilterOptions>
}
