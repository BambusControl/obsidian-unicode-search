import {SaveDataVersion} from "./saveDataVersion";

export interface DataFragment {
    initialized: boolean;
    version: SaveDataVersion;
}

