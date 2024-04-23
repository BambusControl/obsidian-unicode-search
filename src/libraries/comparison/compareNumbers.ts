import {Order} from "../order/order";

export function compareNumbers(left: number, right: number): Order {
	if (left == right) {
		return Order.Equal;
	}

	return left < right
		? Order.Smaller
		: Order.Greater;
}

export function compareDates(left: Date, right: Date): Order {
	if (left == right) {
		return Order.Equal;
	}

	return left < right
		? Order.Smaller
		: Order.Greater;
}

export function compareStrings(left: string, right: string): Order {
	if (left == right) {
		return Order.Equal;
	}

	return left < right
		? Order.Smaller
		: Order.Greater;
}
