import {DataFragmentManager} from "./dataFragmentManager";
import {UnicodeFragment} from "../../libraries/types/savedata/unicodeFragment";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {CharacterDownloader} from "./characterDownloader";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";
import {UnicodeCodepoint} from "../../libraries/types/codepoint/unicode";
import {DexieDb} from "./dexieDb";

export class UnicodeDataManager implements DataFragmentManager<UnicodeFragment> {
    constructor(
        private readonly ucdService: CharacterDownloader,
        private readonly dexieDb: DexieDb
    ) {
    }

    initData(fragment: DataFragment): UnicodeFragment {
        if (fragment.initialized) {
            return fragment;
        }

        console.info("Initializing characters");

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_DATA_VERSION,
        };
    }

    async updateData(fragment: UnicodeFragment, events: Set<DataEvent>): Promise<UnicodeFragment> {
        const updatedData = await this.updateByVersion(fragment);

        const downloadRequested = events.has(DataEvent.DownloadCharacters);
        const emptyCharacterSet = await this.dexieDb.codepoints.count() < 1;

        if (!(downloadRequested || emptyCharacterSet)) {
            return updatedData;
        }

        console.info("Downloading character database");
        const codepoints = await this.ucdService.download();

        console.info("Persisting character database");
        await this.dexieDb.codepoints.clear();
        await this.dexieDb.codepoints.bulkPut(codepoints);

        /* Yeah, we modify the input parameter */
        events.delete(DataEvent.DownloadCharacters);

        return updatedData;
    }

    private async updateByVersion(fragment: UnicodeFragment): Promise<UnicodeFragment> {
        if (fragment.version === "0.7.0") {
            /* Migrate codepoints from old JSON data storage to Dexie */
            console.info("Migrating codepoints to Dexie");

            // @ts-ignore: We know the previous version had the `codepoints` property
            const oldCodepoints = fragment.codepoints as UnicodeCodepoint[];

            /* We expect the database to be empty, this is the first use of it */
            await this.dexieDb.codepoints.clear();
            await this.dexieDb.codepoints.bulkAdd(oldCodepoints);

            fragment.version = CURRENT_DATA_VERSION;
        }

        /* Important: When adding a new migration you must finish the version with the current data version. */
        return fragment;
    }
}
