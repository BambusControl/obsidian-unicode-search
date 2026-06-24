import {ChunkHandler} from "./chunkHandler";
import {UNICODE_PLANES_ALL} from "../../libraries/data/unicodePlanes";
import {UNICODE_CHARACTER_CATEGORIES} from "../../libraries/data/unicodeCharacterCategories";
import {UnicodePlaneNumber} from "../../libraries/data/unicodePlaneNumber";
import {CharacterCategoryGroupType} from "../../libraries/data/characterCategoryGroup";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {PoolChunk} from "../../libraries/types/savedata/poolChunk";
import {DataEvent} from "../../libraries/types/savedata/metaChunk";
import {DataChunk} from "../../libraries/types/savedata/dataChunk";
import {UnicodeFilter} from "../../libraries/types/savedata/unicodeFilter";

export class PoolChunkHandler implements ChunkHandler<PoolChunk> {

    initData(fragment: DataChunk): PoolChunk {
        if (fragment.initialized && isPoolChunk(fragment)) {
            return fragment;
        }

        console.info("Initializing filter");

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_DATA_VERSION,
            unicode: {
                planes: UNICODE_PLANES_ALL.map(plane => ({
                    ...plane.interval,
                    blocks: plane.blocks.map(block => ({
                        ...block.interval,
                        included: DATA_DEFAULTS.planes.includes(plane.planeNumber),
                    }))
                })),
                categoryGroups: UNICODE_CHARACTER_CATEGORIES.map(group => ({
                    abbreviation: group.abbreviation,
                    categories: group.categories.map(category => ({
                        abbreviation: category.abbreviation,
                        included: DATA_DEFAULTS.categories.includes(group.abbreviation),
                    }))
                })),
            }
        }
    }

    async updateData(fragment: PoolChunk, _: Set<DataEvent>): Promise<PoolChunk> {
        /* No-op yet */
        return fragment;
    }

}

type InclusionDefaults = {
    planes: UnicodePlaneNumber[],
    categories: CharacterCategoryGroupType[],
};

const DATA_DEFAULTS: InclusionDefaults = {
    planes: [
        0,
        // 1,
        // 2,
        // 3,
        // 14,
        // 15,
        // 16
    ],
    categories: [
        "L",
        // "M",
        "N",
        "P",
        "S",
        // "Z",
        // "C",
    ],
}

function isPoolChunk(object: DataChunk): object is PoolChunk {
    return "unicode" in object
        && isUnicodeFilter(object.unicode)
        ;
}

function isUnicodeFilter(object: any): object is UnicodeFilter {
    return "planes" in object
        && Array.isArray(object.planes)
        && "categoryGroups" in object
        && Array.isArray(object.categoryGroups)
        ;
}
