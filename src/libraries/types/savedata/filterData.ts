import {CodepointInterval} from "../codepoint/codepointInterval";
import {InclusionFlag} from "../inclusionFlag";
import {CharacterCategoryType} from "../../data/characterCategory";
import {CharacterCategoryGroupType} from "../../data/characterCategoryGroup";

export interface FilterData {
    planes: Array<PlaneFilter>;
    categoryGroups: Array<CategoryGroupFilter>;
}

export interface PlaneFilter extends CodepointInterval {
    blocks: Array<BlockFilter>;
}

export type BlockFilter = CodepointInterval & InclusionFlag;

export interface CategoryGroupFilter {
    abbreviation: CharacterCategoryGroupType;
    categories: Array<CategoryFilter>;
}

export interface CategoryFilter extends InclusionFlag {
    abbreviation: CharacterCategoryType;
}

