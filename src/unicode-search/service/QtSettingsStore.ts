import {QRootDataStore} from "./qRootDataStore";
import {QSettingsStore} from "./QSettingsStore";
import {QFilter} from "../../libraries/types/data/QFilter";

export class QtSettingsStore implements QSettingsStore {

    constructor(private readonly store: QRootDataStore) {
    }

    async getFilter(): Promise<QFilter> {
        return (await this.store.getSettings()).filter;
    }

}
