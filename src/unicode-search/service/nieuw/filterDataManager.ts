import {DataPartManager} from "./dataPartManager";
import {UNICODE_PLANES_ALL} from "../../../libraries/data/oud/unicodePlanes";
import {UNICODE_CHARACTER_CATEGORIES} from "../../../libraries/data/oud/unicodeCharacterCategories";
import {UnicodePlaneNumber} from "../../../libraries/data/oud/unicodePlaneNumber";
import {CharacterCategoryGroupType} from "../../../libraries/data/oud/characterCategoryGroup";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveData";
import {FilterDataNew} from "../../../libraries/types/savedata/nieuw/filterDataNew";
import {
    isTypeFilterDataNew
} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";
import { SaveDataNew } from "src/libraries/types/savedata/nieuw/saveDataNew";

export class FilterDataManager implements DataPartManager<FilterDataNew> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
        ["0.4.0"
            , "0.5.0"
            , "0.6.0"
            , "0.6.1-NEXT"
        ]);

    async initSkeleton(loadedData: any): Promise<FilterDataNew> {
        return isTypeFilterDataNew(loadedData)
            ? loadedData
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

    async initData(dataSkeleton: FilterDataNew): Promise<FilterDataNew> {
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

    async updateData(parsedData: FilterDataNew): Promise<FilterDataNew> {
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

