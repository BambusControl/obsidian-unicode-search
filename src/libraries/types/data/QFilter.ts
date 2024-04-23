import {CodepointInterval} from "../codePointInterval";
import {InclusionFlag} from "./InclusionFlag";
import {CharacterCategoryType} from "../../data/characterCategory";
import {CharacterClassifierType} from "../../data/characterClassifier";

export interface Filter {
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
