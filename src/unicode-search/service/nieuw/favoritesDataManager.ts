import {DataFragmentManager} from "./dataFragmentManager";
import {FavoritesFragment} from "../../../libraries/types/savedata/nieuw/favoritesFragment";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveDataVersion";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaFragment";
import {DataFragment} from "../../../libraries/types/savedata/nieuw/dataFragment";

export class FavoritesDataManager implements DataFragmentManager<FavoritesFragment> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
    [ "0.4.0"
    , "0.5.0"
    , "0.6.0"
    , "0.6.1-NEXT"
    ])

    async initData(fragment: DataFragment): Promise<FavoritesFragment> {
        if (fragment.initialized && isFavoritesFragment(fragment)) {
            return fragment;
        }

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_VERSION,
            codepoints: [],
        };
    }

    async updateData(fragment: FavoritesFragment, events: Set<DataEvent>): Promise<FavoritesFragment> {
        if (this.dataVersions1.has(fragment.version)) {
            return fragment;
        }

        // No data version
        return fragment;
    }

}

function isFavoritesFragment(fragment: DataFragment): fragment is FavoritesFragment {
    return "codepoints" in fragment
        && Array.isArray(fragment.codepoints)
        ;
}
