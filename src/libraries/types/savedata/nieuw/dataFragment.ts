import {CurrentSaveDataVersion, SaveDataVersion} from "../oud/saveDataVersion";

/* TODO [docs] */
export interface DataFragment {
    initialized: boolean;
    version: SaveDataVersion;
}

export interface InitializedDataFragment extends DataFragment {
    initialized: true;
    version: CurrentSaveDataVersion;
}

export interface UninitializedDataFragment extends DataFragment {
    initialized: false;
    version: CurrentSaveDataVersion;
}
