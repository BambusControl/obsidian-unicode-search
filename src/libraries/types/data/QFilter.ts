import {CodePointInterval} from "../codePointInterval";
import {InclusionFlag} from "./InclusionFlag";
import {CharacterCategory} from "../../data/characterCategory";
import {CharacterClassifier} from "../../data/characterClassifier";

export interface QFilter {
    planes: Array<QPlaneFilter>;
    classifiers: Array<QClassifierFilter>;
}

export interface QPlaneFilter extends CodePointInterval {
    blocks: Array<QBlockFilter>;
}

export type QBlockFilter = CodePointInterval & InclusionFlag;

export interface QClassifierFilter {
    classifier: CharacterClassifier
    categories: Array<QCategoryFilter>
}

export type QCategoryFilter = CharacterCategory & InclusionFlag;
