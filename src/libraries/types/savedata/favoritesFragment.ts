import {DataFragment} from "./dataFragment";
import {RawCodepointFavorite} from "../codepoint/extension";

/**
 * Users favorite codepoints
 */
export interface FavoritesFragment extends DataFragment {
    /**
     * List of favorite codepoints
     */
    codepoints: RawCodepointFavorite[]
}
