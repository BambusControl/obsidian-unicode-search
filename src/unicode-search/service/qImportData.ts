import {Plugin} from "obsidian";
import {QSaveData} from "../../libraries/types/data/QSaveData";
import {qInitializationStore} from "./qInitializationStore";
import {UnicodeSearchError} from "../errors/unicodeSearchError";

export async function qImportData(
    dataLoader: Pick<Plugin, "loadData">,
): Promise<QSaveData> {
    const externalData = await dataLoader.loadData();
    /* TODO: SAVE DATA TYPE CHECK */
    const dataLoaded = externalData != null /*&& isTypeSaveData(externalData)*/;

    const newData: QSaveData = dataLoaded
        ? externalData
        : {...qInitializationStore()};

    if (newData == null) {
        /* TODO: I don't think this can ever happen... */
        throw new UnicodeSearchError("Cannot import plugin data. The file is not valid!");
    }

    return newData;
}
