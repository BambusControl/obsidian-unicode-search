import {UserOptions} from "../../libraries/types/userOptions";
import {CharacterFilterOptions} from "../../libraries/types/characterFilterOptions";
import {UnicodeSubcategory} from "../../libraries/types/unicodeCategory";
import {UnicodePlaneNumber} from "../../libraries/types/unicodePlaneNumber";
import {CodePointRange} from "../../libraries/types/codePointRange";

/**
 * Storage service for user settings of the plugin.
 */
export interface UserOptionStore {
    getUserOptions(): Promise<UserOptions>
    saveUserOptions(userOptions: UserOptions): Promise<UserOptions>

    getCharacterSubcategory(category: UnicodeSubcategory): Promise<boolean>
    setCharacterSubcategory(category: UnicodeSubcategory, set: boolean): Promise<void>

    getCharacterPlane(planeNumber: UnicodePlaneNumber): Promise<boolean>
    setCharacterPlane(planeNumber: UnicodePlaneNumber, set: boolean): Promise<void>

    // getCharacterRange(category: CodePointRange): Promise<boolean>
    // setCharacterRange(category: CodePointRange, set: boolean): Promise<void>
}
