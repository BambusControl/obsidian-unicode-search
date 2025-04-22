import {DataFragmentManager} from "./dataFragmentManager";
import {FavoritesFragment} from "../../libraries/types/savedata/favoritesFragment";
import {SaveDataVersion} from "../../libraries/types/savedata/saveDataVersion";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";

export class FavoritesDataManager implements DataFragmentManager<FavoritesFragment> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
    [ "0.4.0"
    , "0.5.0"
    , "0.6.0"
    , "0.6.1-NEXT"
    ])

    initData(fragment: DataFragment): FavoritesFragment {
        if (fragment.initialized && isFavoritesFragment(fragment)) {
            return fragment;
        }

        return {
            ...fragment,
            initialized: true,
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
