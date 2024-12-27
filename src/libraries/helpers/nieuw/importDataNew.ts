import {Plugin} from "obsidian";
import {SaveDataNew} from "../../types/savedata/nieuw/saveDataNew";
import {initializationDataNew} from "../../data/nieuw/initializationDataNew";
import {isTypeSaveDataNew} from "./isTypeSaveDataNew";

export async function importDataNew(
    dataLoader: Pick<Plugin, "loadData">,
): Promise<SaveDataNew> {
    const localData = await dataLoader.loadData();
    const dataLoaded = isTypeSaveDataNew(localData);

    if (dataLoaded) {
        console.log("Data skeleton already present");
        return localData;
    }

    console.log("Creating data skeleton");
    return {...initializationDataNew()};
}
