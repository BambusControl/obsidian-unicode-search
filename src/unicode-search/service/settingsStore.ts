import {FilterData} from "../../libraries/types/savedata/filterData";
import {CodepointInterval} from "../../libraries/types/codepoint/codepointInterval";
import {CharacterCategoryType} from "../../libraries/data/characterCategory";

export interface SettingsStore {
    getFilter(): Promise<FilterData>

    getCharacterBlock(block: CodepointInterval): Promise<boolean>
    setCharacterBlock(block: CodepointInterval, set: boolean): Promise<void>

    getCharacterCategory(category: CharacterCategoryType): Promise<boolean>
    setCharacterCategory(category: CharacterCategoryType, set: boolean): Promise<void>
}
