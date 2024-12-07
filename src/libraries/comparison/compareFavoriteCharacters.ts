import {FavoriteCharacter, MaybeFavoriteCharacter, MaybeUsedCharacter} from "../types/codepoint/character";
import {isFavoriteCharacter} from "../helpers/isFavoriteCharacter";
import {Order} from "../order/order";
import {compareNullable} from "./compareNullable";
import {compareUsageInfo} from "./compareUsageInfo";
import {compareNumbers} from "./compareNumbers";
import {compareFavoriteInfo} from "./compareFavoriteInfo";

function toFavoriteCharacter(character: MaybeUsedCharacter): FavoriteCharacter | null {
    return isFavoriteCharacter(character) ? character : null;
}

export function compareFavoriteCharacters(
    left: MaybeFavoriteCharacter,
    right: MaybeFavoriteCharacter,
): Order {
    return compareNullable(
        toFavoriteCharacter(left),
        toFavoriteCharacter(right),
        (l, r) => compareFavoriteInfo(l, r),
    );
}
