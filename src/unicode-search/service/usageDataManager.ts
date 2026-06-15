import {DataFragmentManager} from "./dataFragmentManager";
import {CharacterUseFragment} from "../../libraries/types/savedata/usageFragment";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";
import {RawCodepointUse} from "../../libraries/types/codepoint/extension";
import {DexieDb} from "./dexieDb";
import {parseUsageInfo} from "../../libraries/helpers/parseUsageInfo";

export class UsageDataManager implements DataFragmentManager<CharacterUseFragment> {
    constructor(
        private readonly dexieDb: DexieDb
    ) {
    }

    initData(fragment: DataFragment): CharacterUseFragment {
        if (fragment.initialized) {
            return fragment;
        }

        console.info("Initializing usage");

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_DATA_VERSION,
        };
    }

    async updateData(fragment: CharacterUseFragment, _: Set<DataEvent>): Promise<CharacterUseFragment> {
        return await this.updateByVersion(fragment);
    }

    private async updateByVersion(fragment: CharacterUseFragment): Promise<CharacterUseFragment> {
        if (fragment.version === "0.7.0") {
            /* Migrate codepoints from old JSON data storage to Dexie */
            console.info("Migrating usage to Dexie");

            // @ts-ignore: We know the previous version had the `codepoints` property
            const oldCodepoints = (fragment.codepoints as RawCodepointUse[]).map(parseUsageInfo);

            /* We expect the database to be empty, this is the first use of it */
            await this.dexieDb.usage.clear();
            await this.dexieDb.usage.bulkAdd(oldCodepoints);

            fragment.version = CURRENT_DATA_VERSION;
        }

        /* Important: When adding a new migration you must finish the version with the current data version. */
        return fragment;
    }
}
