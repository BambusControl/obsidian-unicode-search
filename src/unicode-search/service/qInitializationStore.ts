import {QSaveData, QUserCodepointData} from "../../libraries/types/data/QSaveData";
import {QCodePoint, QCodePointAttribute} from "../../libraries/types/data/QCodePointAttribute";

export function qInitializationStore(): QSaveData {
    return {
        settings: {
            filter: {
                planes: {
                    blocks: {}
                },
                categories: {}
            }
        },
        usage: {
            codepoints: new Map<QCodePoint, QUserCodepointData>()
        },
        unicode: {
            codepoints: new Map<QCodePoint, QCodePointAttribute>()
        }
    }
}
