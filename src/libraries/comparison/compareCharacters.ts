import {Order} from "../order/order";
import {compareNullable} from "./compareNullable";
import {compareUsageTrackedCharacters} from "./compareUsageTrackedCharacters";
import {Character} from "../types/qCharacter";
import {UsageInfo} from "../types/qUsageInfo";
import {compareNumbers} from "./compareNumbers";
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

	// return inverse(compareStrings(left.codepoint, right.codepoint));
	return inverse(compareNumbers(left.codepoint.codepointAt(0)!, right.codepoint.codepointAt(0)!));
}
