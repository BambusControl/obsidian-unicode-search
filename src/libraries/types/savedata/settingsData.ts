import {FilterData} from "./filterData";

export interface SettingsData {
    initialized: boolean;
    modified: boolean;
    filter: FilterData;
}
