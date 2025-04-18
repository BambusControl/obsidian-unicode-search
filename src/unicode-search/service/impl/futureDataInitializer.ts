import {DataManager} from "../dataManager";

export class FutureDataInitializer implements DataManager {
    async initializeData(): Promise<void> {
        console.group("Initializing local data");
        await this.initializeAll();
        console.groupEnd();
    }

    private async initializeAll() {
        /* TODO
         * Run initialization for the main data manager.
         */
    }
}
