import {QRootDataStore} from "./qRootDataStore";

/**
 * Storage service for user settings of the plugin.
 */
export interface QOptionsStore {
}

export class QtOptionsStore {
    public constructor(
        private readonly store: QRootDataStore
    ) {
    }
}
