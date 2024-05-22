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
        DEVELOPMENT: console.log("Data skeleton already present");
        return localData;
    }

    DEVELOPMENT: console.log("Creating data skeleton");
    return {...initializationData()};
}
