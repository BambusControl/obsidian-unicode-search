import {CURRENT_VERSION, SaveData} from "../../types/savedata/oud/saveData";
import {UNICODE_PLANES_ALL} from "../oud/unicodePlanes";
import {UNICODE_CHARACTER_CATEGORIES} from "../oud/unicodeCharacterCategories";
import {UnicodePlaneNumber} from "../oud/unicodePlaneNumber";
import {CharacterCategoryGroupType} from "../oud/characterCategoryGroup";
import {Bambus} from "../../types/savedata/nieuw/bambus";
import {SaveDataNew} from "../../types/savedata/nieuw/saveDataNew";

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

export function bambusInitialization(): Bambus {
    return {
        initialized: false,
        version: CURRENT_VERSION,
    }
}

/* TODO REMOVE */
function filterInitializationData() {
    return {
        ...bambusInitialization(),

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
    };
}

export function initializationDataNew(): SaveDataNew {
    return {
        filter: {
            ...filterInitializationData()
        },
        usage: {
            ...bambusInitialization(),
            codepoints: []
        },
        unicode: {
            ...bambusInitialization(),
            codepoints: []
        },
        favorites: {
            ...bambusInitialization(),
            codepoints: []
        }
    }
}
