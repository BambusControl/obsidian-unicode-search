import {
    CharacterCategory,
    CharacterCategoryLetter,
    CharacterCategoryMark,
    CharacterCategoryNumber,
    CharacterCategoryOther,
    CharacterCategoryPunctuation,
    CharacterCategorySeparator,
    CharacterCategorySymbol
} from "./characterCategory";

export const UNICODE_CATEGORIES_ALL: CharacterCategory[] = [
    ...Object.values(CharacterCategoryLetter),
    ...Object.values(CharacterCategoryMark),
    ...Object.values(CharacterCategoryNumber),
    ...Object.values(CharacterCategoryPunctuation),
    ...Object.values(CharacterCategorySymbol),
    ...Object.values(CharacterCategorySeparator),
    ...Object.values(CharacterCategoryOther),
];
