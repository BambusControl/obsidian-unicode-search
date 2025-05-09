import {MetadataCharacter} from "../types/codepoint/character";
import {Order} from "../order/order";
import {compareFavoriteCharacters} from "./compareFavoriteCharacters";
import {compareUsedCharacters} from "./compareUsedCharacters";
import {compareCodepoints} from "./compareCodepoints";

export function compareCharacters(
    left: MetadataCharacter,
    right: MetadataCharacter,
    recencyCutoff: Date,
): Order {
    const usedComparison = compareUsedCharacters(left, right, recencyCutoff);

    if (usedComparison !== Order.Equal) {
        return usedComparison;
    }

    const favoriteComparison = compareFavoriteCharacters(left, right);

    if (favoriteComparison !== Order.Equal) {
        return favoriteComparison;
    }

    return compareCodepoints(left, right);
}
