import {RootDataStore} from "../rootDataStore";
import {CharacterDownloader} from "../characterDownloader";
import {DataInitializer} from "../dataInitializer";
import {initializationData} from "../../../libraries/data/initializationData";

export class NewDataInitializer implements DataInitializer {
    constructor(
        private readonly dataStore: RootDataStore,
        private readonly ucdService: CharacterDownloader,
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

        if (!await this.dataStore.isCurrentVersion()) {
            /* TODO [before-next-release]: Save data version update deletes user data
             * Create a recursive save data structure, where data will be initialized when all the leafs are.
             * Each section has version number and initialization status---see `Initializable`.
             * The main initializer runs all sub-initializers, and they collectively handle data mapping to new versions.
             * Each section will need an implemented update function from version X to version Y.
             */
            console.log("Plugin and Data version mismatch, reinitializing")
            await this.dataStore.setInitialized(false);
            await this.dataStore.setInitializedSettings(false);
            await this.dataStore.setInitializedUnicode(false);
            await this.dataStore.setInitializedUsage(false);
            await this.dataStore.setInitializedFavorites(false);
        }

        await this.initializeSettings();
        await this.initializeUnicode();
        await this.initializeUsage();
        await this.initializeFavorites();

        console.info("Flagging local data as initialized");
        await this.dataStore.setInitialized(true);
    }

    private async initializeUsage() {
        const usageInitialized = (await this.dataStore.getUsage()).initialized;

        if (usageInitialized) {
            console.info("Usage data already initialized");
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
            console.info("Unicode code point data already initialized");
            return;
        }

        console.info(filterModified ? "Downloading UCD, character filter changed." : "Downloading UCD");

        const codepoints = await this.ucdService.download();

        console.info("Saving Unicode code point data");

        await this.dataStore.overwriteUnicode({
            initialized: true,
            codepoints: codepoints,
        });

        await this.dataStore.setFilterSatisfied(true);
    }

    private async initializeSettings() {
        const settingsInitialized = (await this.dataStore.getSettings()).initialized;

        if (settingsInitialized) {
            console.info("Settings data already initialized");
            return;
        }

        console.info("Settings initialization");

        await this.dataStore.overwriteSettings({
            ...initializationData().settings,
            initialized: true,
        });
    }

    private async initializeFavorites() {
        const favoritesInitialized = (await this.dataStore.getFavorites()).initialized;

        if (favoritesInitialized) {
            console.info("Favorites data already initialized");
            return;
        }

        console.info("Favorites initialization");

        await this.dataStore.overwriteFavorites({
            ...initializationData().favorites,
            initialized: true,
        });
    }
}
