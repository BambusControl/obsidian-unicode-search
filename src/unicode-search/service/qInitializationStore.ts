import {QSaveData} from "../../libraries/types/data/QSaveData";

export function qInitializationStore(): QSaveData {
    return {
        settings: {
            filter: {
                planes: [],
                classifiers: []
            }
        },
        usage: {
            codepoints: []
        },
        unicode: {
            codepoints: []
        }
    }
}
