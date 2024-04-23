import {QSaveData} from "../../libraries/types/data/QSaveData";
import {QCodePointAttribute} from "../../libraries/types/data/QCodePointAttribute";
import {QUserCodepointData} from "../../libraries/types/data/QUserCodepointData";
import {QCodePoint} from "../../libraries/types/data/QCodePoint";

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
