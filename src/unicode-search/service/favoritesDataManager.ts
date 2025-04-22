import {DataFragmentManager} from "./dataFragmentManager";
import {FavoritesFragment} from "../../libraries/types/savedata/favoritesFragment";
import {SaveDataVersion} from "../../libraries/types/savedata/version";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";

export class FavoritesDataManager implements DataFragmentManager<FavoritesFragment> {
    initData(fragment: DataFragment): FavoritesFragment {
        if (fragment.initialized && isFavoritesFragment(fragment)) {
            return fragment;
        }

        console.info("Initializing favorites");

        return {
            ...fragment,
            initialized: true,
            codepoints: [],
        };
    }

    async updateData(fragment: FavoritesFragment, _: Set<DataEvent>): Promise<FavoritesFragment> {
        /* No-op yet */
        return fragment;
    }

}

function isFavoritesFragment(fragment: DataFragment): fragment is FavoritesFragment {
    return "codepoints" in fragment
        && Array.isArray(fragment.codepoints)
        ;
}
