import {SaveDataVersion} from "./saveDataVersion";
import {CategoryFilter, CategoryGroupFilter, PlaneFilter, UnicodeFilter} from "./unicodeFilter";
import {Char, UnicodeCodepoint} from "../codepoint/codepoint";
import {CodepointUsage} from "./codepoint";
import {CharacterCategoryGroupType} from "../../data/characterCategoryGroup";
import {CharacterCategoryType} from "../../data/characterCategory";
import {DateString} from "./usageInfo";

export interface InitialSaveData {
    initialized: boolean;
    version: SaveDataVersion & ( "0.4.0" | "0.5.0" | "0.6.0" );

    settings: {
        initialized: boolean;
        modified: boolean;
        filter: {
            planes: Array<{
                start: number
                end: number
                blocks: Array<{
                    start: number
                    end: number
                    included: boolean
                }>
            }>;
            categoryGroups: Array<{
                abbreviation: "L" | "M" | "N" | "P" | "S" | "Z" | "C";
                categories: Array<{
                    abbreviation: "Ll" | "Lm" | "Lt" | "Lu" | "Lo"
                        | "Mc" | "Me" | "Mn"
                        | "Nd" | "Nl" | "No"
                        | "Pc" | "Pd" | "Pi" | "Pf" | "Ps" | "Pe" | "Po"
                        | "Sc" | "Sk" | "Sm" | "So"
                        | "Zl" | "Zp" | "Zs"
                        | "Cc" | "Cf" | "Cn" | "Co" | "Cs";
                    included: boolean;
                }>;
            }>;
        };
    };
    unicode: {
        initialized: boolean;
        codepoints: Array<{
            codepoint: string;
            name: string;
            category: string;
        }>
    };
    usage: {
        initialized: boolean;
        codepoints: Array<{
            codepoint: string
            firstUsed: string;
            lastUsed: string;
            useCount: number;
        }>
    };
}

export function isInitialSaveData(object: Partial<InitialSaveData>): object is InitialSaveData {
    return object != null
        && "initialized" in object
        && "version" in object

        && "settings" in object
        && object.settings != null
        && "initialized" in object.settings
        && "modified" in object.settings
        && "filter" in object.settings

        && "unicode" in object
        && object.unicode != null
        && "initialized" in object.unicode
        && "codepoints" in object.unicode

        && "usage" in object
        && object.usage != null
        && "initialized" in object.usage
        && "codepoints" in object.usage
        ;
}
