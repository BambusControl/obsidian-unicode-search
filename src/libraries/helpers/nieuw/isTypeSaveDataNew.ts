import {SaveDataNew} from "../../types/savedata/nieuw/saveDataNew";
import {Bambus} from "../../types/savedata/nieuw/bambus";

export function isTypeSaveDataNew(object: Partial<SaveDataNew>): object is SaveDataNew {
    return object != null
        && "settings" in object
        && isTypeBambus(object.settings ?? {})
        && "usage" in object
        && isTypeBambus(object.usage ?? {})
        && "unicode" in object
        && isTypeBambus(object.unicode ?? {})
        ;
}

function isTypeBambus(object: Partial<Bambus>): object is Bambus {
    return "initialized" in object
        && "version" in object
        ;
}
