import {UserOptions} from "../../libraries/types/userOptions";
import {CharacterCategory} from "../../libraries/data/characterCategory";
import {UnicodePlaneNumber} from "../../libraries/data/unicodePlaneNumber";
import {ClosedIntervalEndpoint} from "../../libraries/types/codePointInterval";

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

    getCharacterBlock(blockStart: ClosedIntervalEndpoint): Promise<boolean>
    setCharacterBlock(blockStart: ClosedIntervalEndpoint, set: boolean): Promise<void>

    // getCharacterInterval(category: CodePointInterval): Promise<boolean>
    // setCharacterInterval(category: CodePointInterval, set: boolean): Promise<void>
}
