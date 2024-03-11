import {UserOptions} from "../../libraries/types/userOptions";
import {CharacterCategory} from "../../libraries/data/characterCategory";
import {UnicodePlaneNumber} from "../../libraries/data/unicodePlaneNumber";

/**
 * Storage service for user settings of the plugin.
 */
export interface UserOptionStore {
    getUserOptions(): Promise<UserOptions>
    saveUserOptions(userOptions: UserOptions): Promise<UserOptions>

    getCharacterSubcategory(category: CharacterCategory): Promise<boolean>
    setCharacterSubcategory(category: CharacterCategory, set: boolean): Promise<void>

    getCharacterPlane(planeNumber: UnicodePlaneNumber): Promise<boolean>
    setCharacterPlane(planeNumber: UnicodePlaneNumber, set: boolean): Promise<void>

    // getUnicodeBlock(category: UnicodeBlock): Promise<boolean>
    // setUnicodeBlock(category: UnicodeBlock, set: boolean): Promise<void>

    // getCharacterRange(category: CodePointRange): Promise<boolean>
    // setCharacterRange(category: CodePointRange, set: boolean): Promise<void>
}
