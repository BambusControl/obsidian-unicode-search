import {CharacterCategory, CharacterCategoryLetter} from "../data/characterCategory";
import {UnicodePlaneNumber} from "../data/unicodePlaneNumber";
import {UnicodeBlock} from "./unicodeBlock";
import {ClosedIntervalEndpoint, CodePointInterval} from "./codePointInterval";
import {CharacterClassifier} from "../data/characterClassifier";

export interface CharacterFilterOptions {
    /**
     * The unicode categories to include in the search prompt.
     */
    // unicodeCategories: UnicodeCategory[];

    /**
     * The unicode subcategories to include in the search prompt.
     */
    unicodeSubcategories: Array<CharacterCategory>;
    unicodePlanes: Array<UnicodePlaneNumber>;
    unicodeBlocks: Array<ClosedIntervalEndpoint>;
    customIntervals: Array<CodePointInterval>;
}
