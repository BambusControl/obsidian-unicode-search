import {UnicodeCharacter} from "../types/unicode.character";
import {Order} from "../order/order";

export function compareUnicodeNames(a: UnicodeCharacter, b: UnicodeCharacter): Order {
	if (a.name < b.name) {
		return Order.Before;
	}

	if (a.name > b.name) {
		return Order.After;
	}

	return Order.Equal;
}
