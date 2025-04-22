import {CharacterCategoryGroupType} from "../../data/characterCategoryGroup";
import {UnicodeGeneralCategory} from "./unicodeGeneralCategory";

export interface UnicodeGeneralCategoryGroup {
    abbreviation: CharacterCategoryGroupType;
    name: string;
    categories: UnicodeGeneralCategory[];
}
