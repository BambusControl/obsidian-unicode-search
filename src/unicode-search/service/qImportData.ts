import {Plugin} from "obsidian";
import {QSaveData} from "../../libraries/types/data/QSaveData";
import {qInitializationStore} from "./qInitializationStore";
import {qIsTypeSaveData} from "../../libraries/helpers/qIsTypeSaveData";

export async function qImportData(
    dataLoader: Pick<Plugin, "loadData">,
): Promise<QSaveData> {
    const localData = await dataLoader.loadData();

    const dataLoaded = qIsTypeSaveData(localData);


    if (dataLoaded) {
        console.log("Data skeleton already present");
        return localData;
    }

    console.log("Creating data skeleton");
    return {...qInitializationStore()};
}
