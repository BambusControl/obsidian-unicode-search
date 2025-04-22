import {CodepointInterval} from "../codepoint/codepointInterval";
import {CharacterCategoryType} from "../../data/characterCategory";
import {CharacterCategoryGroupType} from "../../data/characterCategoryGroup";

/**
 * User set filter data for Unicode characters.
 */
export interface UnicodeFilter {
    /**
     * Filter criteria for planes of Unicode characters
     */
    planes: PlaneFilter[];

    /**
     * Filter criteria for category groups of Unicode characters
     */
    categoryGroups: CategoryGroupFilter[];
}

/**
 * Unicode Plane of Unicode Blocks
 */
export interface PlaneFilter extends CodepointInterval {
    /**
     * Filter criteria for blocks of Unicode characters
     */
    blocks: BlockFilter[];
}

/**
 * A flag indicating whether a character is included in search or not
 */
export interface InclusionFlag {
    /**
     * Indicates whether a character is included in search or not
     */
    included: boolean;
}

/**
 * Block of Unicode Codepoints
 */
export type BlockFilter = CodepointInterval & InclusionFlag;

/**
 * Filters for a group of categories.
 */
export interface CategoryGroupFilter {
    /**
     * Single letter abbreviation of the category group.
     * @maxLength 1
     * @minLength 1
     */
    abbreviation: CharacterCategoryGroupType;

    /**
     * Categories which belong to the group.
     */
    categories: CategoryFilter[];
}

/**
 * Filter for a single category.
 */
export interface CategoryFilter extends InclusionFlag {
    /**
     * Two letter abbreviation of the category.
     * @maxLength 2
     * @minLength 2
     */
    abbreviation: CharacterCategoryType;
}
