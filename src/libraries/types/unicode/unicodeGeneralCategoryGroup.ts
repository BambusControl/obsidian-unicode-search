import {CharacterCategoryGroupType} from "../../data/characterCategoryGroup";
import {UnicodeGeneralCategory} from "./unicodeGeneralCategory";

export type UnicodeGeneralCategoryGroup = {
    abbreviation: CharacterCategoryGroupType,
    name: string,
    categories: Array<UnicodeGeneralCategory>,
}
