import {UnicodeCharacter} from "../types/unicodeCharacter";
import {Order} from "../order/order";
import {QUnicodeCodePointWithAttributes} from "../types/data/QUnicodeCodePointWithAttributes";

export function compareUnicodeNames(a: UnicodeCharacter, b: UnicodeCharacter): Order {
	if (a.name < b.name) {
		return Order.Before;
	}

	if (a.name > b.name) {
		return Order.After;
	}

	return Order.Equal;
}

export function qCompareUnicodeNames(a: QUnicodeCodePointWithAttributes, b: QUnicodeCodePointWithAttributes): Order {
	if (a.name < b.name) {
		return Order.Before;
	}

	if (a.name > b.name) {
		return Order.After;
	}

	return Order.Equal;
}
