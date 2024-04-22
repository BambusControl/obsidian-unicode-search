import {OptionsStore} from "../optionsStore";
import {RootDataStore} from "../rootDataStore";
import {MetadataStore} from "../metadataStore";
import {CodePoint, CodePointInterval} from "../../../libraries/types/codePointInterval";
import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {UnicodePlaneFilter} from "../../../libraries/types/unicodePlaneFilter";
import {codePointIn} from "../../../libraries/helpers/codePointIn";
import {CharacterFilterOptions} from "../../../libraries/types/characterFilterOptions";

export class PluginOptionsStore implements OptionsStore {

    public constructor(
        private readonly store: RootDataStore & MetadataStore,
    ) {
    }

    public async getCharacterFilters(): Promise<CharacterFilterOptions> {
        return (await this.store.getUserOptions()).characterFilter
    }

    public async allBlocksIncluded(plane: CodePointInterval): Promise<boolean> {
        const unicodePlanes = (await this.getCharacterFilters()).unicodePlanes;

        return unicodePlanes
            .filter(p => p.select === "ALL")
            .map(p => p.plane)
            .includes(plane);
    }

    public async includeAllBlocks(plane: CodePointInterval, include: boolean): Promise<void> {
        const userdata = (await this.store.getUserOptions());
        const planeFilters = userdata.characterFilter.unicodePlanes

        if (include) {
            PluginOptionsStore.includeAllBlocksFromPlane(plane, planeFilters);
        } else {
            PluginOptionsStore.excludeAllBlocksFromPlane(plane, planeFilters);
        }

        /* Doesn't save the state correctly */

        /* TODO: refactor these */
        await this.store.saveUserOptions({
            ...userdata,
            characterFilter: {
                ...userdata.characterFilter,
                unicodePlanes: [...planeFilters],
            }
        })

        await this.store.flagToReinitialize();
    }

    public async getCharacterBlock(blockStart: CodePoint): Promise<boolean> {
        const unicodePlanes = (await this.getCharacterFilters()).unicodePlanes;
        const plane = unicodePlanes.find(p => codePointIn(blockStart, p.plane))

        if (plane == null) {
            return false;
        }

        return plane.select === "ALL"
            || plane.select.some(b => b.block.start === blockStart)
    }

    public async setCharacterBlock(blockStart: CodePoint, set: boolean): Promise<void> {
        throw new UnicodeSearchError("Not implemented");
    }


    private static includeAllBlocksFromPlane(plane: CodePointInterval, filters: Array<UnicodePlaneFilter>) {
        const foundIndex = filters.findIndex(p => p.plane === plane);
        const planePresent = foundIndex >= 0;

        if (planePresent) {
            filters[foundIndex] = {
                plane: plane,
                select: "ALL"
            };
        } else {
            filters.push({
                plane: plane,
                select: "ALL"
            });
        }

        return filters;
    }

    private static excludeAllBlocksFromPlane(plane: CodePointInterval, filters: Array<UnicodePlaneFilter>) {
        const foundIndex = filters.findIndex(p => p.plane === plane);
        const planePresent = foundIndex >= 0;

        if (planePresent) {
            filters.splice(foundIndex, 1);
        }

        return filters;
    }
}
