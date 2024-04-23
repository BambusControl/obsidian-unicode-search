import {CodepointInterval} from "../codepoint/codepointInterval";
import {InclusionFlag} from "../inclusionFlag";
import {CharacterCategoryType} from "../../data/characterCategory";
import {CharacterClassifierType} from "../../data/characterClassifier";

export interface FilterData {
    planes: Array<PlaneFilter>;
    classifiers: Array<ClassifierFilter>;
}

export interface PlaneFilter extends CodepointInterval {
    blocks: Array<BlockFilter>;
}

export type BlockFilter = CodepointInterval & InclusionFlag;

export interface ClassifierFilter {
    classifier: CharacterClassifierType;
    name: string;
    categories: Array<CategoryFilter>;
}

export interface CategoryFilter extends InclusionFlag {
    category: CharacterCategoryType;
    name: string;
}

