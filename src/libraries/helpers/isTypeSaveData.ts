import {DataFragment} from "../types/savedata/dataFragment";
import {CharLiteral, CodepointKey, CodepointLiteral} from "../types/codepoint/unicode";


export function isTypeDataFragment(object: any): object is DataFragment {
    return object != null
        && "initialized" in object
        && "version" in object
        ;
}

export function isCodepointLiteral(object: any): object is CodepointLiteral {
    return object != null
        && typeof object === "number"
        ;
}

export function isCodepointKey(object: any): object is CodepointKey {
    return object != null
        && "id" in object
        && isCodepointLiteral(object.id);

}

export function isCharLiteral(object: any): object is CharLiteral {
    return object != null
        && typeof object === "string"
        ;
}
