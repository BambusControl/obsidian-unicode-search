import {Order} from "../order/order";
import {UnicodeCodepointWithAttributes} from "../types/data/QUnicodeCodepointWithAttributes";

export function compareUnicodeNames(a: UnicodeCodepointWithAttributes, b: UnicodeCodepointWithAttributes): Order {
	if (a.name < b.name) {
		return Order.Before;
	}

	if (a.name > b.name) {
		return Order.After;
	}

	return Order.Equal;
}
