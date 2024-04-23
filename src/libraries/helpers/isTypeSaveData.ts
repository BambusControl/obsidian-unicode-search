import {SaveData} from "../types/data/QSaveData";
import {Settings} from "../types/data/QSettings";
import {Unicode} from "../types/data/QUnicode";
import {Usage} from "../types/data/QUsage";

export function isTypeSaveData(object: Partial<SaveData>): object is SaveData {
    return object != null
        && "initialized" in object
        && "version" in object
        && "settings" in object
        && isTypeSettings(object.settings ?? {})
        && "usage" in object
        && isTypeUsage(object.usage ?? {})
        && "unicode" in object
        && isTypeUnicode(object.unicode ?? {})
        ;
}

function isTypeSettings(object: Partial<Settings>): object is Settings {
    return "initialized" in object;
}

function isTypeUnicode(object: Partial<Unicode>): object is Unicode {
    return "initialized" in object;
}

function isTypeUsage(object: Partial<Usage>): object is Usage {
    return "initialized" in object;
}
