import {Pinnable} from "../types/pinnable";
import {Order} from "../order/order";
import {compareNullable} from "./compare.nullable";
import {compareNumbers} from "./compare.numbers";

export function comparePinnableCharacters(left: Pinnable, right: Pinnable): Order {
	return compareNullable(
		left.pinned,
		right.pinned,
		(l, r) => compareNumbers(l, r),
	);
}
