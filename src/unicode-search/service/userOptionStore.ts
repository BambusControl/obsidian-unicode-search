import {UserOptions} from "../../libraries/types/userOptions";
import {CharacterFilterOptions} from "../../libraries/types/characterFilterOptions";
import {UnicodeSubcategory} from "../../libraries/types/unicodeCategory";

/**
 * Storage service for user settings of the plugin.
 */
export interface UserOptionStore {
    getUserOptions(): Promise<UserOptions>
    saveUserOptions(userOptions: UserOptions): Promise<UserOptions>
    getCharacterSubcategory(category: UnicodeSubcategory): Promise<boolean>
    setCharacterSubcategory(category: UnicodeSubcategory, set: boolean): Promise<void>
}
