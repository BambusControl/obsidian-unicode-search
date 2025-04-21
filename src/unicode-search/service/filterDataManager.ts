import {DataFragmentManager} from "./dataFragmentManager";
import {UNICODE_PLANES_ALL} from "../../libraries/data/unicodePlanes";
import {UNICODE_CHARACTER_CATEGORIES} from "../../libraries/data/unicodeCharacterCategories";
import {UnicodePlaneNumber} from "../../libraries/data/unicodePlaneNumber";
import {CharacterCategoryGroupType} from "../../libraries/data/characterCategoryGroup";
import {SaveDataVersion} from "../../libraries/types/savedata/saveDataVersion";
import {FilterFragment} from "../../libraries/types/savedata/filterFragment";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";
import {UnicodeFilter} from "../../libraries/types/savedata/unicodeFilter";

export class FilterDataManager implements DataFragmentManager<FilterFragment> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
        [ "0.4.0"
        , "0.5.0"
        , "0.6.0"
        , "0.6.1-NEXT"
        ]);

    initData(fragment: DataFragment): FilterFragment {
        if (fragment.initialized && isFilterFragment(fragment)) {
            return fragment;
        }

        return {
            ...fragment,
            initialized: true,
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

    async updateData(fragment: FilterFragment, events: Set<DataEvent>): Promise<FilterFragment> {
        if (this.dataVersions1.has(fragment.version)) {
            return fragment;
        }

        // No data version
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

function isFilterFragment(object: DataFragment): object is FilterFragment {
    return "modified" in object
        && "unicode" in object
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
