import {Order} from "./order";

export function inverse(order: Order): Order {
	switch (order) {
		case Order.Before:
			return Order.After;
		case Order.After:
			return Order.Before;
		default:
			return Order.Equal;
	}
}
