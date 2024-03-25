import {CharacterCategory} from "../data/characterCategory";
import {UnicodePlaneFilter} from "./unicodePlaneFilter";

export interface CharacterFilterOptions {
    categories: Array<CharacterCategory>;
    unicodePlanes: Array<UnicodePlaneFilter>;
}

