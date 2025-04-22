import {DataFragment} from "../types/savedata/dataFragment";
import {CodepointKey} from "../types/codepoint/codepointKey";
import {Char} from "../types/codepoint/codepoint";


export function isTypeDataFragment(object: any): object is DataFragment {
    return object != null
        && "initialized" in object
        && "version" in object
        ;
}

export function isCodepointKey(object: any): object is CodepointKey {
    return object != null
        && "codepoint" in object
        && isChar(object.codepoint);
}

export function isChar(object: any): object is Char {
    return object != null
        && typeof object === "string"
        && object.length === 1
}
