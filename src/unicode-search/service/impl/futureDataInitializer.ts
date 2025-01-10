import {DataInitializer} from "../dataInitializer";

export class FutureDataInitializer implements DataInitializer {
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
