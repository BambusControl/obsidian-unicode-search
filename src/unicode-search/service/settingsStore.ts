import {FilterData} from "../../libraries/types/savedata/filterData";
import {CodepointInterval} from "../../libraries/types/codepoint/codepointInterval";

export interface SettingsStore {
    getFilter(): Promise<FilterData>

    getCharacterBlock(block: CodepointInterval): Promise<boolean>
    setCharacterBlock(block: CodepointInterval, set: boolean): Promise<void>
}
