import {RootDataStore} from "../rootDataStore";
import {SettingsStore} from "../settingsStore";
import {BlockFilter, FilterData, PlaneFilter} from "../../../libraries/types/savedata/filterData";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {Codepoint} from "../../../libraries/types/codepoint/codepoint";
import {CodepointInterval} from "../../../libraries/types/codepoint/codepointInterval";

export class settingsStorage implements SettingsStore {

    constructor(private readonly store: RootDataStore) {
    }

    async getFilter(): Promise<FilterData> {
        return (await this.store.getSettings()).filter
    }

    allBlocksIncluded(plane: CodepointInterval): Promise<boolean> {
        throw new UnicodeSearchError("Not implemented");
    }

    includeAllBlocks(plane: CodepointInterval, set: boolean): Promise<void> {
        throw new UnicodeSearchError("Not implemented");
    }

    async getCharacterBlock(blockStart: Codepoint): Promise<boolean> {
        return (await this.getBlockFilters())
            .some(blockFilter => blockFilter.start === blockStart && blockFilter.included);
    }

    setCharacterBlock(blockStart: Codepoint, set: boolean): Promise<void> {
        throw new UnicodeSearchError("Not implemented");
    }

    private async getBlockFilters(): Promise<BlockFilter[]> {
        return (await this.getPlaneFilters())
            .flatMap(plane => plane.blocks);
    }

    private async getPlaneFilters(): Promise<PlaneFilter[]> {
        return (await this.getFilter()).planes;
    }

}
