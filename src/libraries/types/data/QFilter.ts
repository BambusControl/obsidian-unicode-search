import {CodePointInterval} from "../codePointInterval";
import {InclusionFlag} from "./InclusionFlag";
import {CharacterCategoryType} from "../../data/characterCategory";
import {CharacterClassifierType} from "../../data/characterClassifier";

export interface QFilter {
    planes: Array<QPlaneFilter>;
    classifiers: Array<QClassifierFilter>;
}

export interface QPlaneFilter extends CodePointInterval {
    blocks: Array<QBlockFilter>;
}

export type QBlockFilter = CodePointInterval & InclusionFlag;

export interface QClassifierFilter {
    classifier: CharacterClassifierType;
    name: string;
    categories: Array<QCategoryFilter>;
}

export interface QCategoryFilter extends InclusionFlag {
    category: CharacterCategoryType;
    name: string;
}
