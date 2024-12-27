import {UnicodeFilter} from "../../libraries/types/savedata/oud/unicodeFilter";
import {CodepointInterval} from "../../libraries/types/codepoint/codepointInterval";
import {CharacterCategoryType} from "../../libraries/data/oud/characterCategory";

export interface SettingsStore {
    getFilter(): Promise<UnicodeFilter>

    getCharacterBlock(block: CodepointInterval): Promise<boolean>
    setCharacterBlock(block: CodepointInterval, set: boolean): Promise<void>

    getCharacterCategory(category: CharacterCategoryType): Promise<boolean>
    setCharacterCategory(category: CharacterCategoryType, set: boolean): Promise<void>
}
