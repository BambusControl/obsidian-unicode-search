import {Plugin} from "obsidian";
import {SaveData} from "../../types/savedata/oud/saveData";
import {initializationData} from "../../data/oud/initializationData";
import {isTypeSaveData} from "./isTypeSaveData";
import {SaveDataNew} from "../../types/savedata/nieuw/saveDataNew";

export async function importData(
    dataLoader: Pick<Plugin, "loadData">,
): Promise<SaveData | SaveDataNew> {
    /* TODO: redo this crap */
    const localData = await dataLoader.loadData();
    const dataLoaded = isTypeSaveData(localData);

    if (dataLoaded) {
        console.log("Data skeleton already present");
        return localData;
    }

    console.log("Creating data skeleton");
    return {...initializationData()};
}
