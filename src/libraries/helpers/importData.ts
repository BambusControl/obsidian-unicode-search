import {Plugin} from "obsidian";
import {SaveData} from "../types/savedata/saveData";
import {initializationData} from "../data/initializationData";
import {isTypeSaveData} from "./isTypeSaveData";

export async function importData(
    dataLoader: Pick<Plugin, "loadData">,
): Promise<SaveData> {
    const localData = await dataLoader.loadData();
    const dataLoaded = isTypeSaveData(localData);

    if (dataLoaded) {
        console.log("Data skeleton already present");
        return localData;
    }

    console.log("Creating data skeleton");
    return {...initializationData()};
}
