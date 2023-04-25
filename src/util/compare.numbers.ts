import {Order} from "../data/order";

export function compareNumbers(left: number, right: number): Order {
	if (left == right) {
		return Order.Equal;
	}

	return left < right
		? Order.Smaller
		: Order.Greater;
}
