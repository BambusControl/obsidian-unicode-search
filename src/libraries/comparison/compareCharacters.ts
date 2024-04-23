import {Order} from "../order/order";
import {UsageInfo} from "../types/usageInfo";
import {compareNullable} from "./compareNullable";
import {compareUsageTrackedCharacters, qCompareUsageTrackedCharacters} from "./compareUsageTrackedCharacters";
import {compareUnicodeNames, qCompareUnicodeNames} from "./compareUnicodeNames";
import {Character} from "../types/character";
import {QCharacter} from "../types/qCharacter";
import {QUsageInfo} from "../types/qUsageInfo";
import {compareNumbers, compareStrings} from "./compareNumbers";
import {inverse} from "../order/inverse";

export function compareCharacters(left: Character, right: Character): Order {
	const order = compareNullable(
		left as UsageInfo,
		right as UsageInfo,
		(l, r) => compareUsageTrackedCharacters(l, r),
	);

	if (order != Order.Equal) {
		return order;
	}

	return compareUnicodeNames(left, right);
}

export function qCompareCharacters(left: QCharacter, right: QCharacter): Order {
	const order = compareNullable(
		left as QUsageInfo,
		right as QUsageInfo,
		(l, r) => qCompareUsageTrackedCharacters(l, r),
	);

	if (order != Order.Equal) {
		return order;
	}

	// return inverse(compareStrings(left.codePoint, right.codePoint));
	return inverse(compareNumbers(left.codePoint.codePointAt(0)!, right.codePoint.codePointAt(0)!));
}
