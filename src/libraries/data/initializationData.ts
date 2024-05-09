import {SaveData} from "../types/savedata/saveData";
import {UNICODE_PLANES_ALL} from "./unicodePlanes";
import {UNICODE_CHARACTER_CATEGORIES} from "./unicodeCharacterCategories";
import {UnicodePlaneNumber} from "./unicodePlaneNumber";
import {CharacterCategoryGroupType} from "./characterCategoryGroup";

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

export function initializationData(): SaveData {
    return {
        initialized: false,
        version: "0.6.0-NEXT",
        settings: {
            initialized: false,
            modified: false,
            filter: {
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
        },
        usage: {
            initialized: false,
            codepoints: []
        },
        unicode: {
            initialized: false,
            codepoints: []
        }
    }
}
