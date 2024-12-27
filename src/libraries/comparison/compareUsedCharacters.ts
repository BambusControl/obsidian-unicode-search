import {Order} from "../order/order";
import {compareNullable} from "./compareNullable";
import {compareUsageInfo} from "./compareUsageInfo";
import {MaybeUsedCharacter, UsedCharacter} from "../types/codepoint/character";
import {isUsedCharacter} from "../helpers/oud/isUsedCharacter";

function toUsedCharacter(character: MaybeUsedCharacter): UsedCharacter | null {
    return isUsedCharacter(character) ? character : null;
}

export function compareUsedCharacters(
    left: MaybeUsedCharacter,
    right: MaybeUsedCharacter,
    recencyCutoff: Date,
): Order {
	return compareNullable(
        toUsedCharacter(left),
        toUsedCharacter(right),
        (l, r) => compareUsageInfo(l, r, recencyCutoff),
	);
}
