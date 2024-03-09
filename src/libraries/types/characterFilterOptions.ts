import {UnicodeCategory, UnicodeSubcategory, UnicodeSubcategoryLetter} from "./unicodeCategory";
import {UnicodePlaneNumber} from "./unicodePlaneNumber";

export interface CharacterFilterOptions {
    /**
     * The unicode categories to include in the search prompt.
     */
    // unicodeCategories: UnicodeCategory[];

    /**
     * The unicode subcategories to include in the search prompt.
     */
    unicodeSubcategories: UnicodeSubcategory[];
    unicodePlanes: UnicodePlaneNumber[];
}
