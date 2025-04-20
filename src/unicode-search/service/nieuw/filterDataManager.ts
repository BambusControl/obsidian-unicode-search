import {DataFragmentManager} from "./dataFragmentManager";
import {UNICODE_PLANES_ALL} from "../../../libraries/data/oud/unicodePlanes";
import {UNICODE_CHARACTER_CATEGORIES} from "../../../libraries/data/oud/unicodeCharacterCategories";
import {UnicodePlaneNumber} from "../../../libraries/data/oud/unicodePlaneNumber";
import {CharacterCategoryGroupType} from "../../../libraries/data/oud/characterCategoryGroup";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveDataVersion";
import {FilterFragment} from "../../../libraries/types/savedata/nieuw/filterFragment";
import {
    isTypeFilterFragment
} from "../../../libraries/helpers/nieuw/isTypeSaveData";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaFragment";

export class FilterDataManager implements DataFragmentManager<FilterFragment> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
        [ "0.4.0"
        , "0.5.0"
        , "0.6.0"
        , "0.6.1-NEXT"
        ]);

    async initSkeleton(rawData: any): Promise<FilterFragment> {
        return isTypeFilterFragment(rawData)
            ? rawData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                modified: false,
                unicode: {
                    planes: [],
                    categoryGroups: [],
                },
            };
    }

    async initData(dataSkeleton: FilterFragment): Promise<FilterFragment> {
        if (dataSkeleton.initialized) {
            return dataSkeleton;
        }

        return {
            ...dataSkeleton,
            initialized: true,
            version: CURRENT_VERSION,
            modified: false,
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

    async updateData(parsedData: FilterFragment, events: Set<DataEvent>): Promise<FilterFragment> {
        if (this.dataVersions1.has(parsedData.version)) {
            return parsedData;
        }

        // No data version
        return parsedData;
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

