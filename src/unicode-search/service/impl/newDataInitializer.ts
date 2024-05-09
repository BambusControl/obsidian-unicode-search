import {RootDataStore} from "../rootDataStore";
import {CodepointStore} from "../codePointStore";
import {CharacterDownloader} from "../characterDownloader";
import {DataInitializer} from "../dataInitializer";
import {initializationData} from "../../../libraries/data/initializationData";

export class NewDataInitializer implements DataInitializer {
    constructor(
        private readonly dataStore: RootDataStore,
        private readonly characterDataStore: CodepointStore,
        private readonly ucdService: CharacterDownloader
    ) {
    }

    async initializeData(): Promise<void> {
        console.group("Initializing local data");
        await this.initializeAll();
        console.groupEnd();
    }

    private async initializeAll() {
        if (await this.dataStore.isInitialized()) {
            console.info("Plugin data already initialized");
            return;
        }

        await this.initializeSettings();
        await this.initializeUnicode();
        await this.initializeUsage();

        console.info("Flagging local data as initialized");
        await this.dataStore.setInitialized(true);
    }

    private async initializeUsage() {
        const usageInitialized = (await this.dataStore.getUsage()).initialized;

        if (usageInitialized) {
            return;
        }

        console.info("Usage initialization");

        await this.dataStore.overwriteUsage({
            ...initializationData().usage,
            initialized: true,
        });
    }

    private async initializeUnicode() {
        const charactersInitialized = (await this.dataStore.getUnicode()).initialized;
        const filterModified = (await this.dataStore.getSettings()).modified;

        if (charactersInitialized && !filterModified) {
            return;
        }

        console.info(filterModified ? "Downloading UCD, character filter changed." : "Downloading UCD");

        const data = await this.ucdService.download();

        console.info("Saving code point data");

        await this.characterDataStore.initializeCodepoints(data);
        await this.dataStore.setFilterSatisfied(true);
    }

    private async initializeSettings() {
        const settingsInitialized = (await this.dataStore.getSettings()).initialized;

        if (settingsInitialized) {
            return;
        }

        console.info("Settings initialization");

        await this.dataStore.overwriteSettings({
            ...initializationData().settings,
            initialized: true,
        });
    }
}
