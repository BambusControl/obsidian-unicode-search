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
        DEVELOPMENT: console.group("Initializing local data");
        await this.initializeAll();
        DEVELOPMENT: console.groupEnd();
    }

    private async initializeAll() {
        if (await this.dataStore.isInitialized()) {
            DEVELOPMENT: console.info("Plugin data already initialized");
            return;
        }

        if (!await this.dataStore.isCurrentVersion()) {
            DEVELOPMENT: console.log("Plugin and Data version mismatch, reinitializing")
            await this.dataStore.setInitialized(false);
            await this.dataStore.setInitializedSettings(false);
            await this.dataStore.setInitializedUnicode(false);
            await this.dataStore.setInitializedUsage(false);
        }

        await this.initializeSettings();
        await this.initializeUnicode();
        await this.initializeUsage();

        DEVELOPMENT: console.info("Flagging local data as initialized");
        await this.dataStore.setInitialized(true);
    }

    private async initializeUsage() {
        const usageInitialized = (await this.dataStore.getUsage()).initialized;

        if (usageInitialized) {
            DEVELOPMENT: console.info("Usage data already initialized");
            return;
        }

        DEVELOPMENT: console.info("Usage initialization");

        await this.dataStore.overwriteUsage({
            ...initializationData().usage,
            initialized: true,
        });
    }

    private async initializeUnicode() {
        const charactersInitialized = (await this.dataStore.getUnicode()).initialized;
        const filterModified = (await this.dataStore.getSettings()).modified;

        if (charactersInitialized && !filterModified) {
            DEVELOPMENT: console.info("Unicode code point data already initialized");
            return;
        }

        DEVELOPMENT: console.info(filterModified ? "Downloading UCD, character filter changed." : "Downloading UCD");

        const data = await this.ucdService.download();

        DEVELOPMENT: console.info("Saving Unicode code point data");

        await this.characterDataStore.initializeCodepoints(data);
        await this.dataStore.setFilterSatisfied(true);
    }

    private async initializeSettings() {
        const settingsInitialized = (await this.dataStore.getSettings()).initialized;

        if (settingsInitialized) {
            DEVELOPMENT: console.info("Settings data already initialized");
            return;
        }

        DEVELOPMENT: console.info("Settings initialization");

        await this.dataStore.overwriteSettings({
            ...initializationData().settings,
            initialized: true,
        });
    }
}
