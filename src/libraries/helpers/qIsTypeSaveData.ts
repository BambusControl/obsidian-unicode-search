import {QUsage} from "../types/data/QUsage";
import {QSettings} from "../types/data/QSettings";
import {QUnicode} from "../types/data/QUnicode";
import {QSaveData} from "../types/data/QSaveData";

export function qIsTypeSaveData(object: Partial<QSaveData>): object is QSaveData {
    return object != null
        && "initialized" in object
        && "version" in object
        && "settings" in object
        && qIsTypeSettings(object.settings ?? {})
        && "usage" in object
        && qIsTypeUsage(object.usage ?? {})
        && "unicode" in object
        && qIsTypeUnicode(object.unicode ?? {})
        ;
}

function qIsTypeSettings(object: Partial<QSettings>): object is QSettings {
    return "initialized" in object;
}

function qIsTypeUnicode(object: Partial<QUnicode>): object is QUnicode {
    return "initialized" in object;
}

function qIsTypeUsage(object: Partial<QUsage>): object is QUsage {
    return "initialized" in object;
}
