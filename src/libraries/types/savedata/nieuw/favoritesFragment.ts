import {DataFragment} from "./dataFragment";
import {CodepointFavorite} from "../oud/codepoint";

/**
 * Users favorite codepoints data of the plugin.
 */
export interface FavoritesFragment extends DataFragment {
    codepoints: Array<CodepointFavorite>
}
