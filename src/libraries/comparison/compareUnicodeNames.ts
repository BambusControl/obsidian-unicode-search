import {Order} from "../order/order";

import {UnicodeCodepoint} from "../types/codepoint/codepoint";

export function compareUnicodeNames(a: UnicodeCodepoint, b: UnicodeCodepoint): Order {
	if (a.name < b.name) {
		return Order.Before;
	}

	if (a.name > b.name) {
		return Order.After;
	}

	return Order.Equal;
}
