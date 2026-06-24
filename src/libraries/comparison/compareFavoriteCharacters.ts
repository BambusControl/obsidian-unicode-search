import {FavoriteCharacter, MaybeFavoriteCharacter, MaybeCharacterWithUseHistory} from "../types/codePoint/character";
import {isFavoriteCharacter} from "../helpers/isFavoriteCharacter";
import {Order} from "../order/order";
import {compareNullable} from "./compareNullable";
import {compareFavorite} from "./compareFavorite";

function toFavoriteCharacter(character: MaybeCharacterWithUseHistory): FavoriteCharacter | null {
    return isFavoriteCharacter(character) ? character : null;
}

export function compareFavoriteCharacters(
    left: MaybeFavoriteCharacter,
    right: MaybeFavoriteCharacter,
): Order {
    return compareNullable(
        toFavoriteCharacter(left),
        toFavoriteCharacter(right),
        (l, r) => compareFavorite(l, r),
    );
}
