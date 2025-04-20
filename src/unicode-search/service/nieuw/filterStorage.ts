import {FilterStore} from "../filterStore";
import {BlockFilter, CategoryFilter, UnicodeFilter} from "../../../libraries/types/savedata/oud/unicodeFilter";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {CodepointInterval} from "../../../libraries/types/codepoint/codepointInterval";
import {intervalsEqual} from "../../../libraries/helpers/oud/intervalsEqual";
import {intervalWithin} from "../../../libraries/helpers/oud/intervalWithin";
import {CharacterCategoryType} from "../../../libraries/data/oud/characterCategory";
import {RootDataStore} from "../rootDataStore";
import {MetaStorage} from "./metaStorage";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaFragment";

export class FilterStorage implements FilterStore {

    constructor(
        private readonly store: RootDataStore,
        private readonly meta: MetaStorage,
    ) {
    }

    async getFilter(): Promise<UnicodeFilter> {
        return (await this.store.getFilter()).unicode
    }

    async getCharacterBlock(block: CodepointInterval): Promise<boolean> {
        return (await this.getBlockFilters())
            .some(blockFilter => intervalsEqual(blockFilter, block) && blockFilter.included);
    }

    async setCharacterBlock(block: CodepointInterval, set: boolean): Promise<void> {
        const filter = await this.store.getFilter();
        const planeIndex = filter.unicode.planes.findIndex(pf => intervalWithin(pf, block));

        if (planeIndex < 0) {
            throw new UnicodeSearchError(`Block doesn't belong to any codepoint plane. ${block}`);
        }

        const blockIndex = filter.unicode.planes[planeIndex].blocks.findIndex(bf => intervalsEqual(bf, block));

        if (blockIndex < 0) {
            throw new UnicodeSearchError(`Block doesn't exist within a plane. ${block}`);
        }

        filter.unicode.planes[planeIndex].blocks[blockIndex].included = set;
        await this.meta.request(DataEvent.DownloadCharacters);

        await this.store.overwriteFilter(filter);
    }

    async getCharacterCategory(category: CharacterCategoryType): Promise<boolean> {
        return (await this.getCategoryFilters())
            .some(filter => filter.abbreviation === category && filter.included);
    }

    async setCharacterCategory(category: CharacterCategoryType, set: boolean): Promise<void> {
        const filter = await this.store.getFilter();
        const groupIndex = filter.unicode.categoryGroups.findIndex(gf => gf.abbreviation === category[0]);

        if (groupIndex < 0) {
            throw new UnicodeSearchError(`Codepoint category group doesn't exist. ${category}: ${category[0]}`);
        }

        const categoryIndex = filter.unicode.categoryGroups[groupIndex].categories.findIndex(cf => cf.abbreviation === category);

        if (categoryIndex < 0) {
            throw new UnicodeSearchError(`Block doesn't exist within a plane. ${category}`);
        }

        filter.unicode.categoryGroups[groupIndex].categories[categoryIndex].included = set;
        await this.meta.request(DataEvent.DownloadCharacters);

        await this.store.overwriteFilter(filter);
    }

    private async getBlockFilters(): Promise<BlockFilter[]> {
        return (await this.getFilter()).planes
            .flatMap(plane => plane.blocks);
    }

    private async getCategoryFilters(): Promise<CategoryFilter[]> {
        return (await this.getFilter()).categoryGroups
            .flatMap(group => group.categories);
    }
}
