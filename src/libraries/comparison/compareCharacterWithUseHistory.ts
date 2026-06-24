import type { Order } from "../order/order";
import { compareNullable } from "./compareNullable";
import { compareUseRecord } from "./compareUseRecord";
import type {
	MaybeCharacterWithUseHistory,
	CharacterWithUseHistory,
} from "../types/codePoint/character";
import { isCharacterWithUseHistory } from "../helpers/isCharacterWithUseHistory";

function toCharacterWithUseHistory(
	character: MaybeCharacterWithUseHistory,
): CharacterWithUseHistory | null {
	return isCharacterWithUseHistory(character) ? character : null;
}

export function compareCharacterWithUseHistorys(
	left: MaybeCharacterWithUseHistory,
	right: MaybeCharacterWithUseHistory,
	recencyCutoff: Date,
): Order {
	return compareNullable(
		toCharacterWithUseHistory(left),
		toCharacterWithUseHistory(right),
		(l, r) => compareUseRecord(l, r, recencyCutoff),
	);
}
