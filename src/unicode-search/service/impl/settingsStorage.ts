import {RootDataStore} from "../rootDataStore";
import {SettingsStore} from "../settingsStore";
import {BlockFilter, FilterData} from "../../../libraries/types/savedata/filterData";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {CodepointInterval} from "../../../libraries/types/codepoint/codepointInterval";
import {intervalsEqual} from "../../../libraries/helpers/intervalsEqual";
import {intervalWithin} from "../../../libraries/helpers/intervalWithin";
import {set} from "immutable";
import {CharacterCategoryType} from "../../../libraries/data/characterCategory";

export class SettingsStorage implements SettingsStore {

    constructor(private readonly store: RootDataStore) {
    }

    async getFilter(): Promise<FilterData> {
        return (await this.store.getSettings()).filter
    }

    async getCharacterBlock(block: CodepointInterval): Promise<boolean> {
        return (await this.getBlockFilters())
            .some(blockFilter => blockFilter.included && intervalsEqual(blockFilter, block));
    }

    async setCharacterBlock(block: CodepointInterval, set: boolean): Promise<void> {
        const settings = await this.store.getSettings();
        const planeIndex = settings.filter.planes.findIndex(pf => intervalWithin(pf, block));

        if (planeIndex < 0) {
            throw new UnicodeSearchError(`Block doesn't belong to any codepoint plane. ${block}`);
        }

        const blockIndex = settings.filter.planes[planeIndex].blocks.findIndex(bf => intervalsEqual(bf, block));

        if (blockIndex < 0) {
            throw new UnicodeSearchError(`Block doesn't exist within a plane. ${block}`);
        }

        settings.filter.planes[planeIndex].blocks[blockIndex].included = set;
        settings.initialized = false;

        await this.store.overwriteSettings(settings);
    }

    async getCharacterCategory(category: CharacterCategoryType): Promise<boolean> {
        /* TODO */
        return true;
    }

    async setCharacterCategory(category: CharacterCategoryType, set: boolean): Promise<void> {
        throw new UnicodeSearchError("Not implemented!")
    }

    private async getBlockFilters(): Promise<BlockFilter[]> {
        return (await this.getFilter()).planes
            .flatMap(plane => plane.blocks);
    }
}
