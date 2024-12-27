import {CurrentSaveDataVersion, SaveDataVersion} from "../oud/saveData";

/* TODO [docs] */
export interface Bambus {
    initialized: boolean;
    version: SaveDataVersion;
}

export interface InitializedBambus {
    initialized: true;
    version: CurrentSaveDataVersion;
}
