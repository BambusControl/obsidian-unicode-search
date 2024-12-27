import {Bambus} from "./bambus";
import {CodepointFavorite} from "../oud/codepoint";

/**
 * Users favorite codepoints data of the plugin.
 */
export interface FavoritesDataNew extends Bambus {
    codepoints: Array<CodepointFavorite>
}
