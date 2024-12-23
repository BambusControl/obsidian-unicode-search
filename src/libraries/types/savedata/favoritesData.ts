import {Initializable} from "./initializable";
import {CodepointFavorite} from "./codepoint";

/**
 * Users favorite codepoints data of the plugin.
 */
export interface FavoritesData extends Initializable {
    codepoints: Array<CodepointFavorite>
}
