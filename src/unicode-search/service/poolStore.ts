import {UnicodeFilter} from "../../libraries/types/savedata/unicodeFilter";
import {CodePointInterval} from "../../libraries/types/codePoint/codePointInterval";
import {CharacterCategoryType} from "../../libraries/data/characterCategory";

export interface PoolStore {
    getFilter(): Promise<UnicodeFilter>

    getCharacterBlock(block: CodePointInterval): Promise<boolean>
    setCharacterBlock(block: CodePointInterval, set: boolean): Promise<void>

    getCharacterCategory(category: CharacterCategoryType): Promise<boolean>
    setCharacterCategory(category: CharacterCategoryType, set: boolean): Promise<void>
}
