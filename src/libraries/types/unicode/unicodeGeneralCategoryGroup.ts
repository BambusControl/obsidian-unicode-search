import {CharacterCategoryGroupType} from "../../data/characterCategory";

import {UnicodeGeneralCategory} from "./unicodeGeneralCategory";

export type UnicodeGeneralCategoryGroup = {
    abbreviation: CharacterCategoryGroupType,
    name: string,
    categories: Array<UnicodeGeneralCategory>,
}
