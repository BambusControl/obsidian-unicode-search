import {CodepointInterval} from "../codepoint/codepointInterval";
import {InclusionFlag} from "../inclusionFlag";
import {CharacterCategoryType} from "../../data/characterCategory";
import {CharacterCategoryGroupType} from "../../data/characterCategoryGroup";

/**
 * User filter data for Unicode characters.
 */
export interface FilterData {
    planes: Array<PlaneFilter>;
    categoryGroups: Array<CategoryGroupFilter>;
}

/**
 * Unicode Plane of Unicode Blocks
 */
export interface PlaneFilter extends CodepointInterval {
    blocks: Array<BlockFilter>;
}

/**
 * Block of Unicode Codepoints
 */
export type BlockFilter = CodepointInterval & InclusionFlag;

/**
 * Unicode Category Groups
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
    categories: Array<CategoryFilter>;
}

/**
 * Unicode Categories
 */
export interface CategoryFilter extends InclusionFlag {
    /**
     * Two letter abbreviation of the category.
     * @maxLength 2
     * @minLength 2
     */
    abbreviation: CharacterCategoryType;
}

