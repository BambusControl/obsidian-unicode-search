import {RawUseRecord, UseRecord} from "../types/savedata/useRecord";

export function parseUseRecord<T>(value: T & RawUseRecord): T & UseRecord {
    return {
        ...value,
        lastUse: new Date(value.lastUse),
        firstUse: new Date(value.firstUse),
    }
}
