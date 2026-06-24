import {RawUseRecord, UseRecord} from "../types/savedata/useRecord";

export function serializeUseRecord<T>(value: T & UseRecord): T & RawUseRecord {
    return {
        ...value,
        lastUse: value.lastUse.toJSON(),
        firstUse: value.firstUse.toJSON(),
    }
}
