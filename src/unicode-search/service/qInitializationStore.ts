import {QSaveData} from "../../libraries/types/data/QSaveData";

export function qInitializationStore(): QSaveData {
    return {
        initialized: false,
        version: "0.5.0-NEXT",
        settings: {
            initialized: false,
            filter: {
                planes: [],
                classifiers: []
            }
        },
        usage: {
            initialized: false,
            codepoints: []
        },
        unicode: {
            initialized: false,
            codepoints: []
        }
    }
}
