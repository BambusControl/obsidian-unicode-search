import {UnicodeCategory, UnicodeSubcategory, UnicodeSubcategoryLetter} from "./unicodeCategory";

export interface CharacterFilterOptions {
    /**
     * The unicode categories to include in the search prompt.
     */
    // unicodeCategories: UnicodeCategory[];

    /**
     * The unicode subcategories to include in the search prompt.
     */
    unicodeSubcategories: UnicodeSubcategory[];
}
