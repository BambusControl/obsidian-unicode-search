import {CharacterForSearch} from "../types/codePoint/character";
import {Order} from "../order/order";
import {compareFavoriteCharacters} from "./compareFavoriteCharacters";
import {compareCharacterWithUseHistorys} from "./compareCharacterWithUseHistory";
import {compareCodePoints} from "./compareCodePoints";

export function compareCharacters(
    left: CharacterForSearch,
    right: CharacterForSearch,
    recencyCutoff: Date,
): Order {
    const usedComparison = compareCharacterWithUseHistorys(left, right, recencyCutoff);

    if (usedComparison !== Order.Equal) {
        return usedComparison;
    }

    const favoriteComparison = compareFavoriteCharacters(left, right);

    if (favoriteComparison !== Order.Equal) {
        return favoriteComparison;
    }

    return compareCodePoints(left, right);
}
