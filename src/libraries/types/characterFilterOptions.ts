import {CharacterCategory, CharacterCategoryLetter} from "../data/characterCategory";
import {UnicodePlaneNumber} from "../data/unicodePlaneNumber";
import {UnicodeBlock} from "./unicodeBlock";
import {CodePointRange} from "./codePointRange";
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
    unicodeBlock: Array<UnicodeBlock["range"]>;
    customRange: Array<CodePointRange>;
}
