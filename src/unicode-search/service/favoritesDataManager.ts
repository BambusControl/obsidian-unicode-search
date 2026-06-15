import {DataFragmentManager} from "./dataFragmentManager";
import {FavoritesFragment} from "../../libraries/types/savedata/favoritesFragment";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";
import {RawCodepointFavorite} from "../../libraries/types/codepoint/extension";
import {DexieDb} from "./dexieDb";
import {parseFavoriteInfo} from "../../libraries/helpers/parseFavoriteInfo";

export class FavoritesDataManager implements DataFragmentManager<FavoritesFragment> {
    constructor(
        private readonly dexieDb: DexieDb
    ) {
    }

    initData(fragment: DataFragment): FavoritesFragment {
        if (fragment.initialized) {
            return fragment;
        }

        console.info("Initializing favorites");

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_DATA_VERSION,
        };
    }

    async updateData(fragment: FavoritesFragment, _: Set<DataEvent>): Promise<FavoritesFragment> {
        return await this.updateByVersion(fragment);
    }

    private async updateByVersion(fragment: FavoritesFragment): Promise<FavoritesFragment> {
        if (fragment.version === "0.7.0") {
            /* Migrate codepoints from old JSON data storage to Dexie */
            console.info("Migrating favorites to Dexie");

            // @ts-ignore: We know the previous version had the `codepoints` property
            const oldCodepoints = (fragment.codepoints as RawCodepointFavorite[]).map(parseFavoriteInfo);

            /* We expect the database to be empty, this is the first use of it */
            await this.dexieDb.favorites.clear();
            await this.dexieDb.favorites.bulkAdd(oldCodepoints);

            fragment.version = CURRENT_DATA_VERSION;
        }

        /* Important: When adding a new migration you must finish the version with the current data version. */
        return fragment;
    }
}
