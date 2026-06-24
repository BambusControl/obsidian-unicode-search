import type {DataChunk} from "../types/savedata/dataChunk";
import type {CodePointKey} from "../types/codePoint/unicode";


export function isTypeDataChunk(object: any): object is DataChunk {
    return object != null
        && "initialized" in object
        && "version" in object
        ;
}

export function isCodePointKey(object: any): object is CodePointKey {
    return object != null
        && "id" in object
        && typeof object.id === "number"
        ;
}
